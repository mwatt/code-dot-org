require_relative '../../../deployment'
require 'cdo/rake_utils'
require 'aws-sdk'
require 'json'
require 'yaml'
require 'erb'


# Manages application-specific configuration and deployment of AWS CloudFront distributions.
module AWS
  class CloudFormation

    def self.create_or_update
      branch = RakeUtils.git_branch
      stack_name = "#{rack_env}-#{branch}"
      json_template = json_template(branch, stack_name)

      cfn = Aws::CloudFormation::Client.new
      stack_exists = !!cfn.describe_stacks(stack_name: stack_name) rescue false
      method = stack_exists ? :update_stack : :create_stack
      updated_stack_id = cfn.method(method).call(
        stack_name: stack_name,
        template_body: json_template,
        capabilities: ['CAPABILITY_IAM']
      ).stack_id
      puts "Stack id: #{updated_stack_id}"
    end

    def self.validate
      branch = RakeUtils.git_branch
      stack_name = "#{rack_env}-#{branch}"
      json_template = json_template(branch, stack_name)
      cfn = Aws::CloudFormation::Client.new
      puts json_template
      puts cfn.validate_template(
        template_body: json_template
      ).description
    end

    def self.json_template(branch, stack_name)
      domain = 'cdn-code.org'
      ssl_cert = Aws::ACM::Client.new(region: 'us-east-1')
        .list_certificates(certificate_statuses: ["ISSUED"])
        .certificate_summary_list
        .find{|cert| cert.domain_name == "*.#{domain}"}
        .certificate_arn
      template_string = File.read(aws_dir('cloud_formation_stack.yml.erb'))
      local_variables = OpenStruct.new(
        local_mode: !!CDO.chef_local_mode,
        stack_name: stack_name,
        ssh_key_name: ENV['SSH_KEY_NAME'] || 'server_access_key',
        image_id: ENV['IMAGE_ID'] || 'ami-9abea4fb',
        instance_type: ENV['INSTANCE_TYPE'] || 'm4.4xlarge',
        branch: branch,
        region: CDO.aws_region,
        environment: rack_env,
        ssh_ip: ENV['SSH_IP'] || '0.0.0.0/0',
        ssl_cert: ssl_cert,
        domain: domain,
        availability_zone: Aws::EC2::Client.new.describe_availability_zones.availability_zones.first.zone_name
      )
      YAML.load(ERB.new(template_string).result(local_variables.instance_eval { binding })).to_json
    end
  end
end
