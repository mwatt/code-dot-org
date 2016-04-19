class Pd::WorkshopOrganizerReport

  # Construct a report row for each workshop for each organizer
  def self.generate_organizer_report(organizer)
    if organizer.admin
      return Pd::Workshop.all.map do |workshop|
        generate_organizer_report_row(workshop)
      end
    end

    Pd::Workshop.organized_by(organizer).all.map do |workshop|
      generate_district_report_row(workshop)
    end
  end

  def self.generate_organizer_report_row(workshop)
    attendances = Pd::Attendance.for_workshop(workshop)
    teachers = attendances.distinct_teachers
    plp = Pd::Plp.find_by_contact_id(workshop.organizer.id)
    section_url = workshop.section ? "https://code.org/teacher-dashboard#/sections/#{workshop.section.id}" : nil
    # payment_type = plp ? (plp.urban)

    qualified, payment_amount = calculate_payment(workshop, teachers, plp)
    {
      organizer_name: workshop.organizer.name,
      organizer_id: workshop.organizer.id,
      organizer_email: workshop.organizer.email,
      workshop_dates: workshop.sessions.map(&:formatted_date).join(','),
      workshop_type: workshop.workshop_type,
      section_url: section_url,
      facilitators: workshop.facilitators.map(&:name).join(','),
      workshop_name: workshop.friendly_name,
      course: workshop.course,
      subject: workshop.subject,
      num_teachers: teachers.count,
      days: workshop.sessions.count,
      payment_type: payment_type,
      qualified: qualified,
      payment_amount: payment_amount
    }
  end

  def self.calculate_payment(workshop, teachers, plp)
    return [false, 0] if teachers.empty?

    qualified = false
    payment_amount = 0

    if workshop.course == Pd::Workshop::COURSE_CSF && [
      Pd::Workshop::TYPE_PUBLIC,
      Pd::Workshop::TYPE_PRIVATE
    ].include?(workshop.workshop_type)

      qualified = true
      num_teachers_qualified = teachers.all.count do |teacher|
        UserLevel.where(user_id: teacher.id).passing.count > 10
      end

      # 50 * num teachers who have completed > 10 puzzles
      payment_amount = 50 * num_teachers_qualified
    end

    if [
      Pd::Workshop::COURSE_CSP,
      Pd::Workshop::COURSE_ECS,
      Pd::Workshop::COURSE_CS_IN_A,
      Pd::Workshop::COURSE_CS_IN_S
    ].include?(workshop.course) && [
      Pd::Workshop::TYPE_PUBLIC,
      Pd::Workshop::TYPE_PRIVATE
    ].include?(workshop.workshop_type)

      qualified = true
      payment_amount = 40 * teachers.count
      if teachers.count > 10
        payment_amount += 700
      else
        payment_amount += 650
      end

      if plp && plp.urban?
        payment_amount *= 1.25
      end

      payment_amount = (payment_amount + 500 * workshop.facilitators.count) * workshop.sessions.count
    end

    if [
      Pd::Workshop::COURSE_CS_IN_A,
      Pd::Workshop::COURSE_CS_IN_S
    ].include?(workshop.course) &&
      workshop.workshop_type == Pd::Workshop::TYPE_DISTRICT

      qualified = true
      payment_amount = 40 * teachers.count

      if plp && plp.urban?
        payment_amount *= 1.25
      end

      payment_amount = (payment_amount + 500 * workshop.facilitators.count) * workshop.sessions.count
    end

    if workshop.course == Pd::Workshop::COURSE_COUNSELOR_ADMIN && [
      Pd::Workshop::TYPE_PUBLIC,
      Pd::Workshop::TYPE_PRIVATE
    ].include?(workshop.workshop_type)
      # Workshop organizer is qualified for payment
      payment_amount = (20 * teachers.count) + 650

      if organizer == urban
        payment_amount *= 1.25
      end
    end

    [qualified, payment_amount]
  end
end
