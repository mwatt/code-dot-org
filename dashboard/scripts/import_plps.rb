#!/usr/bin/env ruby
require_relative '../config/environment'
require 'csv'

COL_NAME = 'PLP Name'
COL_CONTACT_ID = 'Code Studio ID'
COL_CONTACT_NAME = 'PM Name'
COL_CONTACT_EMAIL = 'PM Email'
COL_URBAN = 'Urban'

ALLOW_CREATE_USERS = true

plps_csv = ARGV[0]
unless plps_csv
  puts 'Usage: import_plps plps.csv'
  exit
end

class CSV::Row
  def [](header)
    raw_value = self.field header
    return nil unless raw_value
    raw_value.strip
  end
end

CSV.foreach(plps_csv, headers: true) do |row|
  name = row[COL_NAME]
  next if name.blank?

  contact_id = row[COL_CONTACT_ID]
  if contact_id.blank?
    contact_email = row[COL_CONTACT_EMAIL]
    next if contact_email.blank?
    contact = User.find_by_email(contact_email.strip)
    unless contact
      if ALLOW_CREATE_USERS
        params = {
          name: row[COL_CONTACT_NAME],
          email: contact_email
        }
        contact = User.find_or_create_teacher(params, nil)
        puts "Created user id #{contact.id}: #{contact_email}"
      else
        puts "Can't find contact #{contact_email} for #{name}. Skipping"
        next
      end
    end
    contact_id = contact.id
  end

  urban = row[COL_URBAN]

  plp = Plp.find_or_create_by(
    name: name,
    contact_id: contact_id
  )
  plp.urban = (urban.strip.downcase == 'yes')
  plp.contact_id = contact_id
  plp.save!

  puts "PLP #{name}, urban: #{urban}, contact_id: #{contact_id}"
end
