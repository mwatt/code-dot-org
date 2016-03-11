module Api
  module V1
    module Pd
      class SessionAttendanceSerializer < ActiveModel::Serializer
        attributes :session, :attendances

        def session
          SessionSerializer.new(object).attributes
        end

        def attendances
          {}.tap do |participants|
            # Start with enrollments.
            object.workshop.enrollments.each do |enrollee|
              user = enrollee.user
              participants[enrollee.email] = {
                name: enrollee.name,
                email: enrollee.email,
                enrolled: true,
                user_id: id_or_nil(user),
                in_section: in_section?(user),
                attended: attended?(user)
              }
            end

            # Next, check for teachers in the section who aren't enrolled.
            if object.workshop.section
              object.workshop.section.students.all.each do |section_student|
                next if participants.include? section_student.email
                participants[section_student.email] = {
                  name: section_student.name,
                  email: section_student.email,
                  enrolled: false,
                  user_id: section_student.id,
                  in_section: true,
                  attended: attended?(section_student)
                }
              end
            end
          end.values
        end

        def id_or_nil(user)
          return nil unless user
          user.id
        end

        def in_section?(user)
          return false unless user && object.workshop.section

          # Teachers enrolled in the workshop are "students" in the section.
          object.workshop.section.students.where(id: user.id).exists?
        end

        def attended?(user)
          return false unless user
          object.attendances.where(teacher_id: user.id).exists?
        end

      end
    end
  end
end
