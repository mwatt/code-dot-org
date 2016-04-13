module Plc::LearningModulesHelper
  def options_for_plc_task_learning_modules
    Plc::LearningModule.all.pluck(:name, :id).sort
  end

  def options_for_evaluation_answer_modules(course_unit)
    course_unit.plc_learning_modules.order(:required, :name).map do |course_unit|
      [course_unit.name += (course_unit.required ? ' - Required' : ''), course_unit.id]
    end
  end
end
