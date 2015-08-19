class TransfersController < ApplicationController
  before_filter :authenticate_user!

  # POST /section/:section_id/transfers
  def create
    new_section_id = params[:section_id]

    if !params.has_key?(:student_ids)
      # TODO: i18n
      render json: {
        error: "Student IDs not provided"
      }, status: :bad_request
      return
    end

    student_ids = params[:student_ids].split(',').map(&:to_i)

    begin
      section = Section.find(new_section_id)
    rescue ActiveRecord::RecordNotFound
      render json: {
        error: "Section does not exist"
      }, status: :not_found
      return
    end

    begin
      students = User.find(student_ids)
    rescue ActiveRecord::RecordNotFound
      # TODO: i18n
      render json: {
        error: "One or more students could not be found"
      }, status: :not_found
      return
    end

    # mass update students
    students.each do |student|
      follower_same_user_teacher = student.followeds.find_by_user_id(section.user_id)
      if follower_same_user_teacher.present?
        follower_same_user_teacher.update_attributes!(section_id: section.id)
      else
        Follower.create!(user_id: section.user_id, student_user: student, section: section)
      end

      # assign_script for each student
      student.assign_script(section.script) if section.script
    end

    render json: {}, status: :no_content
  end
end
