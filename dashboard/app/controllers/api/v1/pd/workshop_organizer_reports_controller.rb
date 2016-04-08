class Api::V1::Pd::WorkshopOrganizerReportsController < ::ApplicationController
  before_action :authenticate_user!

  # TODO: date-filtering

  # GET /api/v1/pd/workshop_organizer_reports
  def index
    report = ::Pd::WorkshopOrganizerReport.generate_organizer_report current_user
    render json: report, serializer: Api::V1::Pd::WorkshopOrganizerReportDataTableSerializer
  end

end
