module Pd
  class WorkshopEnrollmentController < ApplicationController

    # GET /pd/workshops/1/enroll
    def new
      @workshop = ::Pd::Workshop.find_by_id params[:workshop_id]
      view_options(no_footer: true)
      @enrollment = ::Pd::Enrollment.new workshop: @workshop
    end

    # POST /pd/workshops/1/enroll
    def create
      @workshop = ::Pd::Workshop.find_by_id params[:workshop_id]

      if @workshop.enrollments.count >= @workshop.capacity
        # The new page will display a "workshop is full" message.
        render :new
        return
      end

      @enrollment = ::Pd::Enrollment.new workshop: @workshop
      if @enrollment.update enrollment_params
        redirect_to action: :show, code: @enrollment.code, controller: 'pd/workshop_enrollment'
      else
        render :new
      end
    end

    # GET /pd/workshop_enrollment/:code
    def show
      @enrollment = ::Pd::Enrollment.find_by_code params[:code]
      unless @enrollment
        render :not_found unless @enrollment
        return
      end

      @cancel_url = url_for action: :cancel, code: @enrollment.code if @enrollment
    end

    # GET /pd/workshop_enrollment/:code/cancel
    def cancel
      @enrollment = Pd::Enrollment.find_by_code params[:code]
      unless @enrollment
        render :not_found unless @enrollment
        return
      end

      @enroll_url = url_for action: :new, workshop_id: @enrollment.pd_workshop_id
      @enrollment.destroy! if @enrollment
    end

    private

    def enrollment_params
      params.require(:pd_enrollment).permit(
        :name,
        :email,
        :email_confirmation,
        :district_name,
        :school
      )
    end
  end
end
