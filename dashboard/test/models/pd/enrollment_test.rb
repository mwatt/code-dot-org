require 'test_helper'

class Pd::EnrollmentTest < ActiveSupport::TestCase

  test 'code' do
    term1 = create :pd_district_payment_term
    term2 = create :pd_district_payment_term

    refute_nil term1.code
    refute_nil term2.code
    refute_equal term1.code, term2.code
  end

  test 'find by code' do
    term = create :pd_district_payment_term

    found_term = Pd::Enrollment.find_by(code: term.code)
    assert_equal term, found_term
  end

end
