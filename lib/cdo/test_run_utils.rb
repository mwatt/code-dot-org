require_relative './rake_utils'
require_relative '../../deployment'
require 'cdo/hip_chat'

def with_hipchat_logging(name)
  start_time = Time.now
  HipChat.log "Running #{name}..."
  yield if block_given?
  HipChat.log "#{name} succeeded in #{RakeUtils.format_duration(Time.now - start_time)}"
rescue => e
  # notify developers room and our own room
  "<b>#{name}</b> failed in #{RakeUtils.format_duration(Time.now - start_time)}".tap do |message|
    HipChat.log message, color: 'red', notify: 1
    HipChat.developers message, color: 'red', notify: 1
  end
  # log detailed error information in our own room
  puts "#{e}\n#{CDO.backtrace e}", message_format: 'text'
  raise
end

module TestRunUtils
  def self.run_apps_tests
    Dir.chdir(apps_dir) do
      with_hipchat_logging('apps tests') do
        RakeUtils.system 'npm run test-low-memory'
      end
    end
  end

  def self.run_code_studio_tests
    Dir.chdir(code_studio_dir) do
      with_hipchat_logging('Running code studio tests') do
        RakeUtils.system 'npm run test'
      end
    end
  end

  def self.run_blockly_core_tests
    Dir.chdir(blockly_core_dir) do
      with_hipchat_logging('Running blockly core tests') do
        RakeUtils.system './test.sh'
      end
    end
  end

  def self.run_dashboard_tests
    Dir.chdir(dashboard_dir) do
      with_hipchat_logging('Running dashboard tests') do
        RakeUtils.rake 'test'
        RakeUtils.rake 'konacha:run'
      end
    end
  end

  def self.run_pegasus_tests
    Dir.chdir(pegasus_dir) do
      puts 'Running pegasus tests (puts).'
      CDO.log.info 'Running pegasus tests (cdo.log.info)'
      with_hipchat_logging('Running pegasus tests') do
        RakeUtils.rake 'test'
      end
    end
  end

  def self.run_shared_tests
    Dir.chdir(shared_dir) do
      with_hipchat_logging('Running shared tests') do
        RakeUtils.rake 'test'
      end
    end
  end
end
