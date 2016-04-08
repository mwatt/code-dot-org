module Pd
  class WorkshopEnrollmentController < ApplicationController
    load_resource :workshop, class: 'Pd::Workshop', id_param: :workshop_id

    def new
      view_options(no_footer: true)
      @enrollment = ::Pd::Enrollment.new workshop: @workshop
    end

    def create
      @enrollment = ::Pd::Enrollment.new workshop: @workshop
      if @enrollment.update enrollment_params
        enrollment_params
        redirect_to action: :enrolled
      else
        render :new
      end
    end

    def enrolled

    end

    private

    def enrollment_params
      params.require(:pd_enrollment).permit(
        :name,
        :email,
        :email_confirmation
      )
    end
  end
end
