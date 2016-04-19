# Tests for the routes in v2_section_routes.rb

require 'minitest/autorun'
require 'rack/test'
require 'mocha/mini_test'
require_relative 'fixtures/fake_dashboard'
require_relative 'fixtures/mock_pegasus'

class V2SectionRoutesTest < Minitest::Test
  describe 'Section Routes' do
    before do
      FakeDashboard.use_fake_database
      $log.level = Logger::ERROR # Pegasus spams debug logging otherwise
      @pegasus = Rack::Test::Session.new(Rack::MockSession.new(MockPegasus.new, "studio.code.org"))
    end

    describe 'GET /v2/sections' do
      it 'returns 403 "Forbidden" when not signed in' do
        with_role nil
        @pegasus.get '/v2/sections'
        assert_equal 403, @pegasus.last_response.status
      end

      it 'returns empty array when student' do
        with_role FakeDashboard::STUDENT
        @pegasus.get '/v2/sections'
        assert_equal 200, @pegasus.last_response.status
        assert_equal [], JSON.parse(@pegasus.last_response.body)
      end

      it 'returns sections when teacher' do
        with_role FakeDashboard::TEACHER
        @pegasus.get '/v2/sections'
        assert_equal 200, @pegasus.last_response.status
        # TODO(asher): Fix the array, there should be data.
        assert_equal [], JSON.parse(@pegasus.last_response.body)
      end
    end

    describe 'POST /v2/sections' do
    end

    describe 'GET /v2/sections/membership' do
      it 'returns 403 "Forbidden" when not signed in' do
        with_role nil
        @pegasus.get '/v2/sections/membership'
        assert_equal 403, @pegasus.last_response.status
      end

      it 'returns sections for student' do
        with_role FakeDashboard::STUDENT
        @pegasus.get '/v2/sections/membership'
        assert_equal 200, @pegasus.last_response.status
        assert_equal [
          {
            "id"=>150001,
            "location"=>"/v2/sections/150001",
            "name"=>"Fake Section A",
            "login_type"=>"email",
            "grade"=>nil,
            "code"=>nil
          }], 
          JSON.parse(@pegasus.last_response.body)
      end

      it 'ignores deleted sections' do

      end

      it 'ignores deleted follower memberships' do
        with_role FakeDashboard::SELF_STUDENT
        @pegasus.get '/v2/sections/membership'
        assert_equal 200, @pegasus.last_response.status
        assert_equal [], JSON.parse(@pegasus.last_response.body)
      end
    end

    # Stubs the user ID for the duration of the test to match the ID of the
    # user hash given. The result should be pulled in through the mock database.
    # @param [Hash] role
    def with_role(role)
      Documents.any_instance.stubs(:dashboard_user_id).
        returns(role.nil? ? nil : role[:id])
    end

  end
end
