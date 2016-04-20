class Api::V1::Pd::TeacherProgressReportController < ::ApplicationController
  before_action :authenticate_user!

  # TODO: date-filtering

  # GET /api/v1/pd/teacher_progress_report
  def index
    district = nil
    teachers = []
    if current_user.admin?
      # All teachers in all workshops
      teachers = ::Pd::Attendance.distinct_teachers.all
    elsif current_user.district_contact?
      district = District.find_by_contact_id(current_user.id)
      teachers = district.users.all
    elsif current_user.workshop_organizer?
      teachers = ::Pd::Workshop.organized_by(current_user).attendances.distinct_teachers.all
    end

    report = ::Pd::TeacherProgressReport.generate_teacher_progress_report(teachers, district)
    render json: report, serializer: Api::V1::Pd::TeacherProgressReportDataTableSerializer
  end

end
