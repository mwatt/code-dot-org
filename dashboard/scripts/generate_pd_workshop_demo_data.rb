#!/usr/bin/env ruby
require_relative '../config/environment'

if Rails.env == 'production'
  puts 'Generating demo data in production is not allowed'
  exit
end

if Pd::Workshop.count > 0
  puts "#{Pd::Workshop.count} workshops already exist. Are you sure you want to generate more demo data? [y/N]"
  answer = STDIN.gets
  exit unless answer.strip.downcase == 'y'
end

puts "Generating demo data for #{Rails.env}:"
puts

TEACHERS_PER_DISTRICT = 2
FACILITATORS_COUNT = 2
ORGANIZERS = 2
WORKSHOPS = [
  # {course: Pd::Workshop::COURSE_CSP, type: Pd::Workshop::TYPE_PUBLIC, sessions: 2},
  {
    course: Pd::Workshop::COURSE_CSP,
    type: Pd::Workshop::TYPE_DISTRICT,
    sessions: 3,
    enrolled: 5
  }

]

@admin = User.find_or_create_by(
  name: 'admin',
  email: 'admin@example.net',
  admin: true
)

def create_teacher(district = nil)
  i = User.last.id + 1
  teacher = User.create!(
    name: "Demo Teacher #{i}",
    email: "demo_teacher#{i}@example.net",
    username: "demo_organizer#{i}",
    password: 'password',
    user_type: User::TYPE_TEACHER,
    age: 21
  )

  district.users << teacher if district

  puts "  Teacher #{teacher.id}: '#{teacher.name}', #{teacher.email}"
  puts "    in district #{district.name}" if district
  teacher
end

def create_facilitator
  i = User.last.id + 1
  facilitator = User.create!(
    name: "Demo Facilitator #{i}",
    email: "demo_facilitator#{i}@example.net",
    username: "demo_facilitator#{i}",
    password: 'password',
    user_type: User::TYPE_TEACHER,
    age: 21
  )

  facilitator.permission = UserPermission::FACILITATOR
  facilitator.save!

  puts "Facilitator #{facilitator.id}: '#{facilitator.name}', #{facilitator.email}"
  facilitator
end

def create_organizer
  i = User.last.id + 1
  organizer = User.create!(
    name: "Demo organizer #{i}",
    email: "demo_organizer#{i}@example.net",
    username: "demo_organizer#{i}",
    password: 'password',
    user_type: User::TYPE_TEACHER,
    age: 21
  )

  organizer.permission = UserPermission::WORKSHOP_ORGANIZER
  organizer.save!

  puts "Organizer #{organizer.id}: '#{organizer.name}', #{organizer.email}"
  organizer
end

def create_district_teachers
  District.all.each do |district|
    puts "District #{district.name}"
    TEACHERS_PER_DISTRICT.times do
      create_teacher(district)
    end
  end
end

def create_facilitators
  FACILITATORS_COUNT.times do
    create_facilitator
  end
end

def create_organizers
  ORGANIZERS_COUNT.times do
    create_organizer
  end
end

def tomorrow_at(hour, minute = 0)
  tomorrow = Date.today + 1.day
  tomorrow + hour.hours + minute.minutes
end

def create_workshop(definition)
  workshop = Pd::Workshop.create!(
    workshop_type: definition[:type],
    course: definition[:course],
    capacity: definition[:capacity] || 10,
    organizer: definition[:organizer] || create_organizer,
    location_name: definition[:location_name] || "A place called #{SecureRandom.hex(10)}",
    location_address: definition[:location_address] || 'Seattle, WA'
  )

  puts "Workshop #{workshop.id}"

  start = tomorrow_at(8)
  (definition[:sessions] || 1).times do |i|
    start += SecureRandom.random_number(7).days
    session = Pd::Session.create!(
      workshop: workshop,
      start: start + SecureRandom.random_number(3).hours,
      end: start + (3 + SecureRandom.random_number(6)).hours
    )
    puts "  Session #{session.id}: #{session.start} - #{session.end}"
  end

  (definition[:facilitators] || 1).times do |i|
    workshop.facilitators << create_facilitator
  end

  (definition[:enrolled] || 0).times do |i|
    districts_with_terms = Pd::DistrictPaymentTerm.where(course: workshop.course)
    teacher = create_teacher(districts_with_terms.empty? ? nil : districts_with_terms.sample.district)
    teacher.sign_in_count = 1
    teacher.save!
    Pd::Enrollment.create! workshop: workshop, name: teacher.name, email: teacher.email
  end

end

def create_workshops
  WORKSHOPS.each do |definition|
    create_workshop(definition)
  end
end





create_workshops