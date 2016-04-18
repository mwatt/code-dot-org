class Plc::EnrollmentEvaluationsController < ApplicationController
  before_action :assert_unit_assignment_state

  def perform_evaluation
    authorize! :read, Plc::EnrollmentUnitAssignment
    plc_unit_assignment = Plc::EnrollmentUnitAssignment.find(params[:unit_assignment_id])

    @questions = plc_unit_assignment.plc_course_unit.plc_evaluation_questions
    @course_unit = plc_unit_assignment.plc_course_unit
  end

  def submit_evaluation
    authorize! :read, Plc::EnrollmentUnitAssignment
    enrollment_unit_assignment = Plc::EnrollmentUnitAssignment.find(params[:unit_assignment_id])

    enrollment_unit_assignment.update(status: Plc::EnrollmentUnitAssignment::REVIEWING_ASSIGNMENTS)
    redirect_to controller: :enrollment_evaluations, action: :preview_assignments, unit_assignment_id: enrollment_unit_assignment.id, enrolled_modules: params[:answerModuleList]
  end

  def preview_assignments
    authorize! :read, Plc::EnrollmentUnitAssignment
    @enrollment_unit_assignment = Plc::EnrollmentUnitAssignment.find(params[:unit_assignment_id])
    @enrolled_modules = Plc::LearningModule.where(id: params[:enrolled_modules].split(','))

    if @enrolled_modules.where.not(plc_course_unit: @enrollment_unit_assignment.plc_course_unit).any?
      redirect_to controller: :enrollment_evaluations, action: :perform_evaluation, unit_assignment_id: @enrollment_unit_assignment.id
    end
  end

  def confirm_assignments
    modules_to_enroll_in = Plc::LearningModule.where(id: params[:learning_module_ids])
    enrollment_unit_assignment = Plc::EnrollmentUnitAssignment.find(params[:unit_assignment_id])

    if modules_to_enroll_in.where.not(plc_course_unit: enrollment_unit_assignment.plc_course_unit).any?
      redirect_to controller: :enrollment_evaluations, action: :perform_evaluation, unit_assignment_id: enrollment_unit_assignment.id
    else
      enrollment_unit_assignment.enroll_user_in_unit_with_learning_modules(modules_to_enroll_in)
      redirect_to controller: :enrollment_unit_assignments, action: :show, id: enrollment_unit_assignment.id
    end
  end

  private
  def assert_unit_assignment_state
    plc_unit_assignment = Plc::EnrollmentUnitAssignment.find(params[:unit_assignment_id])

    if plc_unit_assignment.nil?
      raise "Cannot perform evaluation - unit assignment with ID #{params[:unit_assignment_id]} does not exist"
    end

    if !([Plc::EnrollmentUnitAssignment::PENDING_EVALUATION, Plc::EnrollmentUnitAssignment::REVIEWING_ASSIGNMENTS].include? plc_unit_assignment.status)
      raise "Cannot perform evaluation - unit assignment is in state #{plc_unit_assignment.status}"
    end
  end
end
