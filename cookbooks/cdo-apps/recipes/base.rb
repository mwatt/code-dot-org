include_recipe 'cdo-repository'
include_recipe 'cdo-secrets'
include_recipe 'cdo-postfix'
include_recipe 'cdo-varnish'

cores = node['cpu']['total']
root = "/home/#{node[:current_user]}/#{node.chef_environment}"
execute 'bundle-install' do
  command "bundle install -j#{cores}"
  cwd root
  user node[:current_user]
  group node[:current_user]
  not_if 'bundle check', cwd: root
end
