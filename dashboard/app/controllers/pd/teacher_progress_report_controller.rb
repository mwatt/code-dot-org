class Pd::TeacherProgressReportController < ApplicationController
  before_action :authenticate_user!

  def index
    view_options(
      full_width: true
    )
  end

end
