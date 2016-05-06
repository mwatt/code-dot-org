#!/usr/bin/env ruby
require_relative '../config/environment'
require 'csv'

COL_DISTRICT_NAME = 'District Name'
COL_NCES_ID = 'NCES District/School ID'
COL_EMAIL_DOMAIN = 'Email Domain'
COL_COURSE_NAME = 'Course Name'
COL_HOURLY_RATE = 'Hourly Rate'
COL_DAILY_RATE = 'Daily Rate'

districts_csv = ARGV[0]
unless districts_csv
  puts 'Usage: import_district_payment_terms districts.csv'
  exit
end

class CSV::Row
  def [](header)
    raw_value = self.field header
    return nil unless raw_value
    raw_value.strip
  end
end

def parse_rate(rate)
  return 0 if rate.blank?
  match = /\$([0-9\.]+)/.match(rate)
  return 0 unless match
  match[1].to_f
end

def find_district(nces_id, name, email_domain)
  district = nil
  district = District.find_by(nces_id: nces_id) unless nces_id.blank?
  if district && district.name != name
    raise "Name mismatch: district (NCES Id: #{nces_id}) has the name " +
      "'#{district.name}' in the db, and '#{name}' in the import."
  end

  unless district
    district = District.find_or_create_by(name: name)
    raise "District not found (NCES Id: #{nces_id}, name: #{name})" unless district
    district.nces_id = nces_id
    district.save!
    puts "Added NCES Id #{nces_id} to district #{name} (id #{district.id})"
  end

  unless email_domain.blank?
    if district.email_domain && district.email_domain != email_domain
      raise "Email domain mismatch: district (NCES Id: #{nces_id}) has the email domain " +
        "'#{district.email_domain}' in the db, and '#{email_domain}' in the import."
    end
    if district.email_domain.blank?
      district.email_domain = email_domain
      district.save!
      puts "Added email domain #{email_domain} to district #{name} (id #{district.id})"
    end
  end
  district
end

CSV.foreach(districts_csv, headers: true) do |row|
  district_name = row[COL_DISTRICT_NAME]
  next if district_name.blank?

  nces_id = row[COL_NCES_ID]
  email_domain = row[COL_EMAIL_DOMAIN]

  district = find_district nces_id, district_name, email_domain

  course = row[COL_COURSE_NAME]
  hourly_rate = row[COL_HOURLY_RATE]
  daily_rate = row[COL_DAILY_RATE]
  if !hourly_rate.blank? && hourly_rate != 'N/A'
    term = Pd::DistrictPaymentTerm.find_or_create_by(district_id: district.id, course: course)
    term.rate_type = Pd::DistrictPaymentTerm::RATE_HOURLY
    term.rate = parse_rate(hourly_rate)
    puts "#{district_name}, #{course}: hourly $#{term.rate}"
  elsif !daily_rate.blank? && daily_rate != 'N/A'
    term = Pd::DistrictPaymentTerm.find_or_create_by(district_id: district.id, course: course)
    term.rate_type = Pd::DistrictPaymentTerm::RATE_DAILY
    term.rate = parse_rate(daily_rate)
    puts "#{district_name}, #{course}: daily $#{term.rate}"
  else
    term = Pd::DistrictPaymentTerm.find_by(district_id: district.id, course: course)
    if term
      term.delete
      puts "#{district_name}, #{course}: clearing old rate"
    end
  end

  if term
    term.save!
  end
end
