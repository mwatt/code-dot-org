class Api::V1::Pd::AdminTeachersController < ApplicationController

  def fake_sign_in
    unless current_user.admin?
      head :forbidden
      return
    end

    user_id = params.require(:user_id)
    user = User.find_by(id: user_id)
    user.sign_in_count = 1 if user.sign_in_count == 0
    user.save!
    head :no_content
  end

  def join_section
    unless current_user.admin?
      head :forbidden
      return
    end

    join_params = params.require(:join).permit(:user_id, :session_id)
    session = ::Pd::Session.find_by(id: join_params[:session_id])
    section = session.workshop.section
    user = User.find_by(id: join_params[:user_id])

    section.add_student(user)
    head :no_content
  end
end
