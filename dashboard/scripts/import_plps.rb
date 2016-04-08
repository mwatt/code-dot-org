#!/usr/bin/env ruby
require_relative '../config/environment'
require 'csv'

plps_csv = ARGV[0]
unless plps_csv
  puts 'Usage: import_plps plps.csv'
  exit
end

CSV.foreach(plps_csv, headers: true) do |row|
  name = row['PLP Name']
  next if name.blank?

  urban = row['Urban']

  # TODO - contact, email
  plp = Pd::Plp.find_or_create_by(name: name)
  plp.urban = (urban.strip.downcase == 'yes')
  plp.save!

  puts "#{name}, urban: #{urban}."
end
