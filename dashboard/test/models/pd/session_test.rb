require 'test_helper'

class Pd::SessionTest < ActiveSupport::TestCase
  setup do
    @session = create :pd_session,
      start: DateTime.new(2016,3,1,9).in_time_zone,
      end: DateTime.new(2016,3,1,17).in_time_zone
  end

  test 'formatted_date' do
    assert_equal '03/01/2016', @session.formatted_date
  end

  test 'formatted_date_with_start_and_end_times' do
    assert_equal '03/01/2016, 9:00am-5:00pm', @session.formatted_date_with_start_and_end_times
  end
end
