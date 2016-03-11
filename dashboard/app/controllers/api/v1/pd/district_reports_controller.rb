module Api
  module V1
    module Pd
      class DistrictReportsController < ::ApplicationController

        # TODO: auth and date-filtering

        # GET /api/v1/pd/district_reports
        def index
          report = ::Pd::DistrictReport.generate_district_report *::District.all
          render json: report, serializer: DistrictReportDataTableSerializer
        end

      end
    end
  end
end
