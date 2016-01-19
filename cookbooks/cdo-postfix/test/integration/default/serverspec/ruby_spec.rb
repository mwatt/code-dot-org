require 'serverspec'
set :backend, :exec

describe 'postfix::default' do
  describe package('postfix') do
    it { should be_installed }
  end

  describe service('postfix') do
    it { should be_enabled }
    it { should be_running }
  end
end
