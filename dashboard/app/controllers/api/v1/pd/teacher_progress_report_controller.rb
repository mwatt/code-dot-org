class Api::V1::Pd::TeacherProgressReportController < Api::V1::Pd::ReportControllerBase
  before_action :authenticate_user!

  # TODO: date-filtering

  # GET /api/v1/pd/teacher_progress_report
  # GET /api/v1/pd/teacher_progress_report.csv
  def index
    teachers = []
    if current_user.admin?
      # All teachers in all workshops
      teachers = ::Pd::Attendance.distinct_teachers
    elsif current_user.district_contact?
      # All teachers from districts for which I am a contact, who are in workshops
      district_ids = ::District.where(contact_id: current_user.id).fetch(:id)
      teachers = ::Pd::Attendance.for_districts(district_ids).distinct_teachers
    elsif current_user.workshop_organizer?
      # All teachers in workshops I organized
      teachers = ::Pd::Workshop.organized_by(current_user).attendances.distinct_teachers
    end

    report = ::Pd::TeacherProgressReport.generate_teacher_progress_report(teachers)

    respond_to do |format|
      format.json {render json: report, serializer: Api::V1::Pd::TeacherProgressReportDataTableSerializer}
      format.csv {send_as_csv_attachment report, 'teacher_progress_report.csv'}
    end
  end
end
