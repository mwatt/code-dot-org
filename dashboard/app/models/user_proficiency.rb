class UserProficiency < ActiveRecord::Base
  belongs_to :user

  # The set of concepts for which proficiency is computed.
  # NOTE: This list is tied to DB columns. DO NOT EDIT without a DB migration.
  CONCEPTS = %w(
    sequencing
    debugging
    repeat_loops
    repeat_until_while
    for_loops
    events
    variables
    functions
    functions_with_params
    conditionals
  )
  # The maximum difficulty ranking for a concept.
  # NOTE: This number is tied to DB columns. DO NOT EDIT without a DB migration.
  MAXIMUM_CONCEPT_DIFFICULTY = 5

  # Returns the number of levels the user has shown proficiency in for the
  # indiciated concept and difficulty or higher.
  def get_level_count(concept, difficulty_number)
    return 0 if !CONCEPTS.include? concept
    return 0 if !(1..MAXIMUM_CONCEPT_DIFFICULTY).cover? difficulty_number

    num_levels = 0
    (difficulty_number..MAXIMUM_CONCEPT_DIFFICULTY).each do |d|
      field_name = concept + "_" + "d" + d.to_s + "_" + "count"
      num_levels += self.send(field_name).to_i
    end
    return num_levels
  end

  # As of April 2015, we define a user as having basic proficiency if they have
  # shown proficiency in three concepts, with proficiency in a concept
  # accomplished by having three or more D3, D4, or D5 levels.
  # NOTE: This definition is expected to change, possibly with an age-related
  # bent.
  def basic_proficiency?
    concept_proficiency_count = 0
    CONCEPTS.each do |concept|
      if get_level_count(concept, 3) >= 3
        concept_proficiency_count += 1
      end
    end
    return concept_proficiency_count >= 3
  end
end
