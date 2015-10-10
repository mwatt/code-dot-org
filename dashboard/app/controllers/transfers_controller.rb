class TransfersController < ApplicationController
  before_filter :authenticate_user!

  # POST /section/:id/transfers
  def create
    new_section_code = params[:id]

    if params.has_key?(:current_section_code)
      current_section_code = params[:current_section_code]
    else
      # TODO: i18n
      render json: {
        error: "Please provide current_section_code."
      }, status: :bad_request
      return
    end

    if params.has_key?(:stay_enrolled_in_current_section)
      stay_enrolled_in_current_section = params[:stay_enrolled_in_current_section]
    else
      # TODO: i18n
      render json: {
        error: "Please provide stay_enrolled_in_current_section."
      }, status: :bad_request
      return
    end

    if params.has_key?(:student_ids)
      student_ids = params[:student_ids].split(',').map(&:to_i)
    else
      # TODO: i18n
      render json: {
        error: "Please provide student_ids."
      }, status: :bad_request
      return
    end

    begin
      current_section = Section.find_by!(code: current_section_code)
    rescue ActiveRecord::RecordNotFound
      # TODO: i18n
      render json: {
        error: "Sorry, but section #{current_section_code} does not exist. Please enter a different section code."
      }, status: :not_found
      return
    end

    begin
      new_section = Section.find_by!(code: new_section_code)
    rescue ActiveRecord::RecordNotFound
      # TODO: i18n
      render json: {
        error: "Sorry, but that section does not exist. Please enter a different section code."
      }, status: :not_found
      return
    end

    begin
      students = User.find(student_ids)
    rescue ActiveRecord::RecordNotFound
      # TODO: i18n
      render json: {
        error: "One or more students could not be found."
      }, status: :not_found
      return
    end

    if student_ids.count != Follower.where(student_user_id: student_ids).count
      # TODO: i18n
      render json: {
        error: "All the students must currently be enrolled in your section."
      }, status: :forbidden
      return
    end


    students.each do |student|
      if !student.followeds.exists?(section_id: new_section.id)
        student.followeds.create!(user_id: new_section.user_id, section: new_section)
      end

      if !stay_enrolled_in_current_section
        student.followeds.find_by_section_id(current_section.id).destroy
      end

      # assign_script for each student
      student.assign_script(new_section.script) if new_section.script
    end

    # mass update students
    # students.each do |student|
    #   follower_same_user_teacher = student.followeds.find_by_user_id(new_section.user_id)
    #   if follower_same_user_teacher.present?
    #     follower_same_user_teacher.update_attributes!(section_id: new_section.id)
    #   else
    #     Follower.create!(user_id: new_section.user_id, student_user: student, section: new_section)
    #   end
    #
    #   # assign_script for each student
    #   student.assign_script(new_section.script) if new_section.script
    # end

    # TODO: Email students if they're transferred to another teacher

    render json: {}, status: :no_content
  end
end
