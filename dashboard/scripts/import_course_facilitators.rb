#!/usr/bin/env ruby
require_relative '../config/environment'
require 'csv'

COL_FIRST_NAME = 'First'
COL_LAST_NAME = 'Last'
COL_USER_ID = 'Code Studio ID'
COL_EMAIL = 'Email Address'
COL_COURSE = 'Program'

# For development. When true, this script creates the facilitator accounts from name
# and email and ignores user_id.
CREATE_USERS = true

facilitators_csv = ARGV[0]
unless facilitators_csv
  puts 'Usage: import_course_facilitators facilitators.csv'
  exit
end

class CSV::Row
  def [](header)
    raw_value = self.field header
    return nil unless raw_value
    raw_value.strip
  end
end

error_count = 0
CSV.foreach(facilitators_csv, headers: true) do |row|
  user_id = row[COL_USER_ID]
  first_name = row[COL_FIRST_NAME]
  last_name = row[COL_LAST_NAME]
  email = row[COL_EMAIL]
  course = row[COL_COURSE]

  raise "Unrecognized course #{course}" unless Pd::Workshop::COURSES.include? course

  facilitator = nil
  if CREATE_USERS
    params = {
      name: "#{first_name} #{last_name}",
      email: email
    }
    facilitator = User.find_or_create_teacher(params, nil)
    facilitator.permission = UserPermission::FACILITATOR
    facilitator.save!
    puts "Created facilitator id #{facilitator.id}: #{email}"
  else
    facilitator = User.find_by(id: user_id)
    if facilitator
      # validate other fields
      unless facilitator.name == "#{first_name} #{last_name}" && facilitator.email == email
        STDERR.puts "Facilitator #{user_id} does not match name or email."
        error_count += 1
        next
      end
    else
      STDERR.puts "Facilitator #{user_id} not found."
      error_count += 1
      next
    end
  end

  Pd::CourseFacilitator.find_or_create_by facilitator: facilitator, course: course
end

if error_count == 0
  puts 'Success.'
end

exit error_count
