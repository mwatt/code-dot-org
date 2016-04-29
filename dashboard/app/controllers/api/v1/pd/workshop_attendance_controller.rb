class Api::V1::Pd::WorkshopAttendanceController < ApplicationController
  load_and_authorize_resource :workshop, class: 'Pd::Workshop'

  # GET /api/v1/pd/workshops/1/attendance
  def show
    render json: @workshop, serializer: ::Api::V1::Pd::WorkshopAttendanceSerializer
  end

  # PATCH /api/v1/pd/workshops/1/attendance
  def update
    workshop_attendance_params[:session_attendances].each do |supplied_session_attendance|
      session = @workshop.sessions.find_by!(id: supplied_session_attendance[:session_id])
      existing_user_ids = session.attendances.map{|attendance| attendance.teacher.id}
      supplied_user_descriptions = supplied_session_attendance[:attendances] || []
      attending_user_ids = supplied_user_descriptions.select{|a| a.is_a? Integer}
      new_user_emails = supplied_user_descriptions.select{|a| a.is_a? String}

      logger.info "---> supplied_user_descriptions: #{supplied_user_descriptions}"
      logger.info "---> attending_user_ids: #{attending_user_ids}"
      logger.info "---> new_user_emails: #{new_user_emails}"

      # This is for admin-override mode. Typically users must already exist to be counted as attended.
      # Create new users.
      new_user_emails.each do |new_user_email|
        teacher = create_teacher new_user_email
        attending_user_ids << teacher.id
        logger.info "---> Teacher created: #{teacher.email}: #{teacher.id}"
      end

      logger.info "---> attending_user_ids: #{attending_user_ids}"


      new_attendees = attending_user_ids - existing_user_ids
      no_longer_attending = existing_user_ids - attending_user_ids

      logger.info "---> new attendees: #{new_attendees}"
      logger.info "---> no longer attending: #{no_longer_attending}"

      new_attendees.each do |user_id|
        Pd::Attendance.create session: session, teacher: User.find_by_id!(user_id)
      end
      no_longer_attending.each do |user_id|
        session.attendances.find_by(teacher_id: user_id).delete
      end

      session.save!
    end

    head :no_content
  end

  private

  def create_teacher(email)
    enrollment = ::Pd::Enrollment.find_by_email!(email)

    params = {
      name: enrollment.name,
      email: email,
      school: enrollment.school
    }
    teacher = User.find_or_create_teacher(params, current_user)

    # TODO: this should go in enrollment.
    # What about users who create their own accounts? Need to account for district somehow
    district = District.find_by_name(enrollment.district_name)
    DistrictsUsers.create!(district_id: district.id, user_id: teacher.id) if district

    teacher
  end

  def workshop_attendance_params
    params.require(:pd_workshop).permit(
      session_attendances: [
        :session_id,
        attendances: []
      ]
    )
  end
end
