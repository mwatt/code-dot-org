#!/usr/bin/env ruby
require_relative '../config/environment'
require 'csv'

districts_csv = ARGV[0]
unless districts_csv
  puts 'Usage: import_district_payment_terms districts.csv'
  exit
end

def parse_rate(rate)
  return 0 if rate.blank?
  match = /\$([0-9\.]+)/.match(rate)
  return 0 unless match
  match[1].to_f
end

CSV.foreach(districts_csv, headers: true) do |row|
  district_name = row['District Name']
  next if district_name.blank?

  district = District.find_or_create_by(name: district_name)

  course = row['Course Name']
  hourly_rate = row['Hourly Rate']
  daily_rate = row['Daily Rate']
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