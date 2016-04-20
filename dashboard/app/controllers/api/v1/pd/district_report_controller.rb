class Api::V1::Pd::DistrictReportController < ::ApplicationController

  # GET /api/v1/pd/district_report
  def index
    authorize! :read, ::Pd::DistrictReport

    report = Pd::DistrictReport.generate_district_report *::District.all
    render json: report, serializer: Api::V1::Pd::DistrictReportDataTableSerializer
  end
end
