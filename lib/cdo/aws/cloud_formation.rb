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
      cfn = Aws::CloudFormation::Client.new
      branch = RakeUtils.git_branch
      stack_name = "#{rack_env}-frontend-#{branch}"
      template_string = File.read(aws_dir('cloud_formation_stack.yml.erb'))
      local_variables = OpenStruct.new(
        local_mode: !!CDO.chef_local_mode,
        stack_name: stack_name,
        ssh_key_name: ENV['SSH_KEY_NAME'] || 'server_access_key',
        image_id: ENV['IMAGE_ID'] || 'ami-d05e75b8',
        instance_type: ENV['INSTANCE_TYPE'] || 'm4.4xlarge',
        branch: branch,
        region: CDO.aws_region,
        environment: rack_env,
        ssh_ip: ENV['SSH_IP'] || '0.0.0.0/0'
      )
      json_template = YAML.load(ERB.new(template_string).result(local_variables.instance_eval{binding})).to_json

      stack_exists = !!cfn.describe_stacks(stack_name: stack_name) rescue false
      method = stack_exists ? :update_stack : :create_stack
      updated_stack_id = cfn.method(method).call(
        stack_name: stack_name,
        template_body: json_template,
        capabilities: ['CAPABILITY_IAM']
      ).stack_id
      puts "Stack id: #{updated_stack_id}"
    end
  end
end
