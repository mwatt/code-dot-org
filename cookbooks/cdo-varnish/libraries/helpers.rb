# Various Ruby helper methods to generate Varnish VCL from the base configuration.

# TODO Find a better way of passing node configuration to Chef config helpers.
$node_env = 'development'
$node_name = 'default'

# Keep these hostname helper methods in sync with deployment.rb.
# TODO Find a better way to reuse existing application configuration in Chef config helpers.
def canonical_hostname(domain)
  return "#{self.name}.#{domain}" if ['console', 'hoc-levels'].include?($node_name)
  return domain if $node_env == 'production'

  # our HTTPS wildcard certificate only supports *.code.org
  # 'env', 'studio.code.org' over https must resolve to 'env-studio.code.org' for non-prod environments
  sep = (domain.include?('.code.org')) ? '-' : '.'
  return "localhost#{sep}#{domain}" if $node_env == 'development'
  return "translate#{sep}#{domain}" if $node_name == 'crowdin'
  "#{$node_env}#{sep}#{domain}"
end

def dashboard_hostname
  canonical_hostname('studio.code.org')
end

def pegasus_hostname
  canonical_hostname('code.org')
end

# Basic regex matcher for the optional query part of a URL.
QUERY_REGEX = "(\\?.*)?$"

# Takes an array of path-patterns as input, validating and normalizing
# them for use within a Varnish regular expression.
# Returns an array of extension patterns and an array of path-prefixed patterns.
def normalize_paths(paths)
  paths = [paths] unless paths.is_a?(Array)
  paths.map(&:dup).partition do |path|
    # Strip leading slash
    if path[0] != '/'
      raise ArgumentError.new("Invalid path: #{path}")
    end
    path.gsub!(/^\//,'')
    is_extension = path[0] == '*'
    if !valid_path?(path) ||
      (is_extension && path.match('/'))
      raise ArgumentError.new("Invalid path: #{path}")
    end
    single_path = !path.match('\*')
    # Strip leading/trailing wildcard
    path.gsub!(/(^\*|\*$)/,'')
    # Escape some special characters
    path.gsub!(/[.+$"]/){|s| '\\' + s}
    path << QUERY_REGEX if single_path
    is_extension
  end
end

# Ensures paths are valid, but don't return any processed results.
# Used by the CloudFront layer to avoid duplicating path-validation logic.
def validate_paths(paths)
  normalize_paths paths
  nil
end

# The maximum length of a path pattern is 255 characters.
# The value can contain any of the following characters:
# A-Z, a-z (case sensitive, so the path pattern /*.jpg doesn't apply to the file /LOGO.JPG.)
# 0-9
# _ - . $ / ~ " ' @ : +
#
# The following characters are allowed in CloudFront path patterns, but
# are not allowed in our configuration format to reduce complexity:
# * (exactly one wildcard required, either at the start or end of the path)
# ? (No 1-character wildcards allowed)
# &, passed and returned as &amp;
def valid_path?(path)
  # Maximum length
  return false if path.length > 255
  # Valid characters allowed
  char = /[A-Za-z0-9_\-.$\/~"'@:+]/
  # Maximum one wildcard allowed at start or end
  return false unless path.match /^(\*#{char}*|#{char}*\*|#{char}*)$/
  true
end

# Varnish uses 'bereq' in 'response' and 'vary' sections, 'req' otherwise.
def req(section)
  ['response', 'vary'].include?(section) ? 'bereq' : 'req'
end

# Returns a regex-matcher string based on an array of filename extensions.
def extensions_to_regex(exts)
  return [] if exts.empty?
  ["(#{exts.join '|'})#{QUERY_REGEX}"]
end

def path_to_regex(path)
  '^/' + path
end

# Returns a regex-conditional string fragment based on the provided behavior.
# In the 'proxy' section, ignore extension-based behaviors (e.g., *.png).
def paths_to_regex(path_config, section='request')
  extensions, paths = normalize_paths(path_config)
  elements = paths.map{|path| path_to_regex(path)}
  elements = extensions_to_regex(extensions) + elements unless section == 'proxy'
  elements.empty? ? 'false' : elements.map{|el| "#{req(section)}.url ~ \"#{el}\""}.join(' || ')
end

# Evaluate the provided path against the provided config, returning the first matched behavior.
def behavior_for_path(behaviors, path)
  behaviors.detect do |behavior|
    paths = behavior[:path]
    next true unless paths
    extensions, paths = normalize_paths(paths)
    next true if extensions.any? && path.match(extensions_to_regex(extensions).first)
    next true if paths.any?{|p| path.match path_to_regex(p) }
    false
  end
end


# Generates the logic string for the specified behavior.
def process_behavior(behavior, app, section)
  case section
    when 'proxy'
      process_proxy(behavior[:proxy] || app, app)
    when 'vary'
      process_vary(behavior)
    when 'request'
      process_request(behavior)
    else
      process_response(behavior)
  end
end

# VCL string to create or update a Vary header field with the provided Vary header.
def set_vary(header, resp)
  <<VCL
  if (!#{resp}.http.Vary) {
    set #{resp}.http.Vary = "#{header}";
  } elseif (#{resp}.http.Vary !~ "(?<=\\s|,|^)#{header}") {
    set #{resp}.http.Vary = #{resp}.http.Vary + ", #{header}";
  }
VCL
end

# VCL string to set the appropriate Vary header fields based on the provided cache behavior.
# Whitelisted headers are added to Vary directly.
# Whitelisted cookies are added to Vary via their extracted X-COOKIE headers.
def process_vary(behavior)
  out = ''
  behavior[:headers].each do |header|
    out << set_vary(header, 'beresp')
  end
  case behavior[:cookies]
    when 'all'
      out << set_vary('Cookie', 'beresp')
    when 'none'
    else
    behavior[:cookies].each do |cookie|
      out << set_vary("X-COOKIE-#{cookie}", 'beresp')
    end
  end
  out
end

# VCL string to extract a cookie into an internal X-COOKIE HTTP header.
def extract_cookie(cookie)
  <<VCL
  if(cookie.isset("#{cookie}")) {
    set req.http.X-COOKIE-#{cookie} = cookie.get("#{cookie}");
  }
VCL
end

# Returns the cookie-extract string for a given 'cookies' behavior.
def extract_cookies(cookies)
  out = ''
  cookies.each do |cookie|
    out << extract_cookie(cookie)
  end
  out
end

# CloudFront removes these headers by default, but can be added back via whitelist.
# Ref: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/RequestAndResponseBehaviorCustomOrigin.html#request-custom-headers-behavior
# Simulate similar behavior in Varnish, with optional defaults.
REMOVED_HEADERS = %w(
  Accept
  Accept-Charset
  Accept-Language:en-US
  Referer
  User-Agent:Cached-Request
)

def process_request(behavior)
  out = ''
  cookies = behavior[:cookies]
  out << case cookies
    when 'all'
      '# Allow all request cookies.'
    when 'none'
      'cookie.filter_except("NO_CACHE");'
    else
      extract_cookies(cookies) + "cookie.filter_except(\"#{cookies.join(',')}\");"
  end
  REMOVED_HEADERS.each do |remove_header|
    name, value = remove_header.split ':'
    unless behavior[:headers].include? name
      if value.nil?
        out << "\nunset req.http.#{name};"
      else
        out << "\nset req.http.#{name} = \"#{value}\";"
      end
    end
  end
  out
end

def unset_header(header)
  <<VCL
if(req.http.#{header}) { unset req.http.#{header}; }
VCL
end

# Returns the cookie-filter string for a given 'cookies' behavior.
def process_response(behavior)
  behavior[:cookies] == 'none' ?
    'unset beresp.http.set-cookie;' :
    '# Allow set-cookie responses.'
end

# Returns the backend-redirect string for a given proxy.
# 'pegasus' or 'dashboard' are the only supported values.
def process_proxy(proxy, app)
  proxy = proxy.to_s
  unless %w(pegasus dashboard).include? proxy
    raise ArgumentError.new("Invalid proxy: #{proxy}")
  end
  hostname = proxy == 'pegasus' ? pegasus_hostname : dashboard_hostname
  out = "set req.backend_hint = #{proxy}.backend();"
  if proxy != app.to_s
    out << "\nset req.http.host = \"#{hostname}\";"
  end
  out
end

# Returns the hostname-specific conditional expression for the app provided.
def if_app(app, section)
  app == :dashboard ? (req(section)+'.http.host ~ "(dashboard|studio).code.org$"') : nil
end

# Generate an "if(){} else if {} else {}" string from an array of items, conditional Proc, and a block.
def if_else(items, conditional)
  _buf = ''
  if items.one? && conditional.call(items.first).nil?
    return yield(items.first)
  end
  items.each_with_index do |item, i|
    condition = conditional.call(item)
    next if condition.to_s == 'false'
    _buf << "#{i != 0 ? 'else ' : ''}#{condition && "if (#{condition}) "}{\n"
    _buf << yield(item).lines.map{|line| '  ' + line }.join << "\n} "
  end
  _buf.slice!(-1)
  _buf
end

# Generates the VCL string for each section: 'request', 'response', 'proxy' or 'vary'.
def setup_behavior(config, section='request')
  app_condition = lambda do |app|
    if_app(app, section)
  end
  if_else([:dashboard, :pegasus], app_condition) do |app|
    app_config = config[app]
    configs = app_config[:behaviors] + [app_config[:default]]
    path_condition = lambda do |behavior|
      behavior[:path] ? paths_to_regex(behavior[:path], section) : nil
    end
    if_else(configs, path_condition) do |behavior|
      process_behavior(behavior, app, section)
    end
  end
end
