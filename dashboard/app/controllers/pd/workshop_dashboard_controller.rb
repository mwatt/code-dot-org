module Pd
  class WorkshopDashboardController < ApplicationController
    def index
      unless current_user.admin? ||
        current_user.district_contact? ||
        current_user.workshop_organizer? ||
        current_user.facilitator?

        render_404
        return
      end

      view_options full_width: true
    end
  end
end
