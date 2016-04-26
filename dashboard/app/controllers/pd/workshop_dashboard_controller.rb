module Pd
  class WorkshopDashboardController < ApplicationController
    authorize_resource class: 'Pd::Workshop'

    def index
      view_options full_width: true
    end

  end
end
