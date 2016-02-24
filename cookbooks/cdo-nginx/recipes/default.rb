apt_repository 'nginx' do
  uri          'ppa:nginx/development'
  distribution 'trusty'
end

apt_package 'nginx'

require 'etc'
uid = Etc.getpwnam(node[:user]).uid
run_unicorn = "/run/user/#{uid}/unicorn"
directory run_unicorn do
  user node[:current_user]
  group node[:current_user]
end

%w(dashboard pegasus).each do |app|
  socket_path = File.join run_unicorn, "#{app}.sock"
  file socket_path do
    action :delete
    not_if { ::File.socket?(socket_path) }
  end
  node.override['cdo-secrets']["#{app}_sock"] = socket_path
end

# Get/create the SSL cert via the `ssl_certificate` cookbook resource
node.default['ssl_certificate']['service']['compatibility'] = 'modern'
ssl = node['cdo-nginx']['ssl_key']['content'] != '' &&
  node['cdo-nginx']['ssl_cert']['content'] != ''

cert = ssl_certificate 'cdo-nginx' do
  namespace node['cdo-nginx']
  if ssl
    chain_name 'cdo-chain'
    chain_source 'attribute'
    source 'attribute'
  end
end

template '/etc/nginx/nginx.conf' do
  source 'nginx.conf.erb'
  user 'root'
  group 'root'
  mode '0644'
  variables ssl_key: cert.key_path,
    ssl_cert: cert.chain_combined_path,
    run_dir: run_unicorn
  notifies :reload, 'service[nginx]', :delayed
end

service 'nginx' do
  supports restart: true, reload: true, status: true
  restart_command 'service nginx restart'
  action [:enable, :start]
end
