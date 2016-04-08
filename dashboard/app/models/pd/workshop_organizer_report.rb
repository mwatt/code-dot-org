class Pd::WorkshopOrganizerReport

  # Construct a report row for each workshop for each organizer
  def self.generate_organizer_report(organizers)
    [].tap do |rows|
      organizers.each do |organizer|
        Pd::Workshop.organized_by(organizer).each do |workshop|
          rows << generate_district_report_row(organizer, workshop)
        end
      end
    end
  end

  def self.generate_organizer_report_row(organizer, workshop)
    attendances = Pd::Attendance.for_workshop(workshop)
    num_teachers = attendances.distinct_teachers.count
    hours = attendances.map(&:hours).reduce(&:+)
    days = attendances.count

    qualified = false
    payment_type = nil
    payment_rate = nil
    payment_amount = nil
    if workshop.workshop_type == Pd::Workshop::TYPE_DISTRICT && workshop.course != Pd::Workshop::COURSE_CSF
      qualified = true

      # TODO: followup: What if the organizer is a contact for multiple districts?
      district = District.where(contact_id: workshop.organizer_id).first
      if district
        payment_term = Pd::DistrictPaymentTerm.where(district_id: district.id, course: workshop.course).first
        if payment_term
          payment_type = payment_term.rate_type
          payment_rate = payment_term.rate
          payment_amount = case payment_term.rate_type
            when 'hourly'
              hours * payment_term.rate
            when 'daily'
              days * payment_term.rate
            else
              0
          end
        end
      end
    end

    {
      organizer_id: organizer.id,
      organizer_name: organizer.name,
      organizer_email: organizer.email,
      workshop_dates: workshop.sessions.map(&:formatted_date).join(','),
      workshop_type: workshop.workshop_type,
      section_url: "https://code.org/teacher-dashboard#/sections/#{workshop.section.id}",
      facilitators: workshop.facilitators.map(&:name).join(','),
      course: workshop.course,
      subject: workshop.subject,
      school: teacher.school,
      num_teachers: num_teachers,
      hours: hours,
      days: days,
      payment_type: payment_type,
      payment_rate: payment_rate,
      qualified: qualified,
      payment_amount: payment_amount
    }
  end
end
