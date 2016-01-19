app_root = "/home/#{node[:current_user]}/#{node.chef_environment}/dashboard"

link "#{app_root}/public/blockly" do
  to "#{app_root}/public/apps-package"
  action :create
  user node[:current_user]
  group node[:current_user]
end

link "#{app_root}/public/shared" do
  to "#{app_root}/public/shared-package"
  action :create
  user node[:current_user]
  group node[:current_user]
end

::Chef::Recipe.send(:include, CdoApps)
setup_app 'dashboard'
