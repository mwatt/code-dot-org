class Pd::TeacherProgressReport

  # Construct a report row for each teacher in the district
  def self.generate_teacher_progress_report(teachers, district = nil)
    [].tap do |rows|
      teachers.map do |teacher|
        # TODO: can teachers belong to multiple districts? Should we have a row for each?
        districts = district ? [district] : District.joins(:users).where(users: {id: teacher.id})
        districts.each do |row_district|
          Pd::Workshop.enrolled_in_by(teacher).each do |workshop|
            rows << generate_report_row(teacher, row_district, workshop)
          end
        end
      end
    end
  end

  def self.generate_report_row(teacher, district, workshop)
    attendances = Pd::Attendance.for_teacher_in_workshop(teacher, workshop)
    hours = attendances.map(&:hours).reduce(&:+)
    days = attendances.count
    {
      district_name: district.name,
      district_external_id: nil,# TODO - add field and import
      school: teacher.school,
      course: workshop.course,
      subject: workshop.subject,
      workshop_dates: workshop.sessions.map(&:formatted_date).join(','),
      workshop_name: workshop.friendly_name,
      workshop_type: workshop.workshop_type,
      teacher_name: teacher.name,
      teacher_id: teacher.id,
      teacher_email: teacher.email,
      year: workshop.sessions.first.start.year,
      hours: hours,
      days: days
    }
  end
end
