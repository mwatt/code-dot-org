require 'test_helper'

class Pd::AttendanceTest < ActiveSupport::TestCase

  setup do
    @workshop = create :pd_workshop
    2.times {@workshop.sessions << create(:pd_session)}

    @teacher1 = create :teacher
    @teacher2 = create :teacher
    create :pd_attendance, session: @workshop.sessions[0], teacher: @teacher1
    create :pd_attendance, session: @workshop.sessions[0], teacher: @teacher2
    create :pd_attendance, session: @workshop.sessions[1], teacher: @teacher1

    @another_workshop = create :pd_workshop
    @another_workshop.sessions << create(:pd_session)
    create :pd_attendance, session: @another_workshop.sessions[0]
  end

  test 'for_workshop' do
    attendances = Pd::Attendance.for_workshop(@workshop)
    assert_equal 3, attendances.count
  end

  test 'for_teacher_in_workshop' do
    attendances = Pd::Attendance.for_teacher_in_workshop(@teacher1, @workshop)
    assert_equal 2, attendances.count
  end

  test 'distinct teachers' do
    teachers = Pd::Attendance.for_workshop(@workshop).distinct_teachers
    assert_equal 2, teachers.count
  end

end
