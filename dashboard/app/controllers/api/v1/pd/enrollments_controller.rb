class Api::V1::Pd::EnrollmentsController < ::ApplicationController
  load_and_authorize_resource :workshop, class: 'Pd::Workshop'
  load_and_authorize_resource class: 'Pd::Enrollment', through: :workshop

  # GET /api/v1/pd/workshops/1/enrollments
  def index
    render json: @enrollments, each_serializer: Api::V1::Pd::EnrollmentSerializer
  end
end
