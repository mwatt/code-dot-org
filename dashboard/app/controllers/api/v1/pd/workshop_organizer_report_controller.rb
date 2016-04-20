class Api::V1::Pd::WorkshopOrganizerReportController < ::ApplicationController
  before_action :authenticate_user!

  # TODO: date-filtering

  # GET /api/v1/pd/workshop_organizer_report
  def index
    report = ::Pd::WorkshopOrganizerReport.generate_organizer_report current_user
    render json: report, serializer: Api::V1::Pd::WorkshopOrganizerReportDataTableSerializer
  end

end
