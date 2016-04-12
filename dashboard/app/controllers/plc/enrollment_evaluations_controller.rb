class Plc::EnrollmentEvaluationsController < ApplicationController
  def perform_evaluation
    authorize! :read, Plc::EnrollmentUnitAssignment
    plc_unit_assignment = Plc::EnrollmentUnitAssignment.find(params[:unit_assignment_id])

    if plc_unit_assignment.status != Plc::EnrollmentUnitAssignment::PENDING_EVALUATION
      raise "Cannot perform evaluation - unit assignment is in state #{plc_unit_assignment.status}"
    end

    @questions = plc_unit_assignment.plc_course_unit.plc_evaluation_questions
    @course_unit = plc_unit_assignment.plc_course_unit
  end

  def submit_evaluation
    authorize! :read, Plc::EnrollmentUnitAssignment
    question_responses = params[:answerModuleList].split(',')
    enrollment_unit_assignment = Plc::EnrollmentUnitAssignment.find(params[:unit_assignment_id])

    modules_to_enroll_in = Plc::LearningModule.where(id: question_responses)

    enrollment_unit_assignment.update(status: Plc::EnrollmentUnitAssignment::REVIEWING_ASSIGNMENTS)
    redirect_to controller: :enrollment_evaluations, action: :preview_assignments, unit_assignment_id: enrollment_unit_assignment.id, enrolled_modules: modules_to_enroll_in.pluck(:id)
  end

  def preview_assignments
    authorize! :read, Plc::EnrollmentUnitAssignment

    @enrollment_unit_assignment = Plc::EnrollmentUnitAssignment.find(params[:unit_assignment_id])
    @enrolled_modules = Plc::LearningModule.where(id: params[:enrolled_modules])
    #Make sure we are in the right state, otherwise redirect appropriately
    case @enrollment_unit_assignment.status
    when Plc::EnrollmentUnitAssignment::START_BLOCKED, Plc::EnrollmentUnitAssignment::IN_PROGRESS, Plc::EnrollmentUnitAssignment::COMPLETED
      redirect_to controller: :enrollment_unit_assignments, action: :show, id: @enrollment_unit_assignment.id
    when Plc::EnrollmentUnitAssignment::PENDING_EVALUATION
      redirect_to controller: :enrollment_evaluations, action: :perform_evaluation, unit_assignment_id: params[:unit_assignment_id]
    end
  end

  # def confirm_assignments
  #   modules_to_enroll_in = params[:selectedModuleList].split(',')
  #   enrollment_unit_assignment = Plc::EnrollmentUnitAssignment.find(params[:unit_assignment_id])
  #   enrollment_unit_assignment.enroll_user_in_unit_with_learning_modules(modules_to_enroll_in)
  # end
end
