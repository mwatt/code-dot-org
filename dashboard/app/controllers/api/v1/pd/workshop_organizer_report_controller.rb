class Api::V1::Pd::WorkshopOrganizerReportController < Api::V1::Pd::ReportControllerBase

  # TODO: date-filtering

  # GET /api/v1/pd/workshop_organizer_report
  # GET /api/v1/pd/workshop_organizer_report.csv
  def index
    report = ::Pd::WorkshopOrganizerReport.generate_organizer_report current_user

    respond_to do |format|
      format.json {render json: report, serializer: Api::V1::Pd::WorkshopOrganizerReportDataTableSerializer}
      format.csv {send_as_csv_attachment report, 'workshop_organizer_report.csv'}
    end
  end
end
