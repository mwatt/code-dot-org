class Pd::TeacherProgressReport

  # Construct a report row for each teacher
  def self.generate_teacher_progress_report(teachers)
    [].tap do |rows|
      teachers.map do |teacher|
        district = District.joins(:users).where(users: {id: teacher.id}).first
        Pd::Workshop.attended_by(teacher).each do |workshop|
          rows << generate_report_row(teacher, district, workshop)
        end
      end
    end
  end

  def self.generate_report_row(teacher, district, workshop)
    attendances = Pd::Attendance.for_teacher_in_workshop(teacher, workshop)
    hours = attendances.map(&:session).map(&:hours).reduce(&:+)
    days = attendances.count
    district_name = district_nces_id = nil
    if district
      district_name = district.name
      district_nces_id = district.nces_id
    end

    {
      district_name: district_name,
      district_nces_id: district_nces_id,
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
