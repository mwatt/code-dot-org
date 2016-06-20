# == Schema Information
#
# Table name: user_geos
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  indexed_at  :datetime         not null
#  ip_address  :string(255)
#  city        :string(255)
#  state       :string(255)
#  country     :string(255)
#  postal_code :string(255)
#  latitude    :decimal(8, 6)
#  longitude   :decimal(9, 6)
#
# Indexes
#
#  index_user_geos_on_user_id  (user_id)
#

class UserGeo < ActiveRecord::Base
  # Given a new IP address, populates (by IP geolocation) and saves the other
  # fields if the IP address is new or has changed.
  def populate(user_id, ip_to_geolocate)
    return if ip_address == ip_to_geolocate
    raise ArgumentError, "#{self.user_id}, #{user_id}" unless
      self.user_id.nil? || self.user_id == user_id

    geocoder_result = Geocoder.search(ip_to_geolocate).first
    return if geocoder_result.nil?

    self.user_id = user_id
    self.ip_address = ip_to_geolocate
    self.city = geocoder_result.city if geocoder_result.city
    self.state = geocoder_result.state if geocoder_result.state
    self.country = geocoder_result.country if geocoder_result.country
    self.postal_code = geocoder_result.postal_code if geocoder_result.postal_code
    self.latitude = geocoder_result.latitude if geocoder_result.latitude
    self.longitude = geocoder_result.longitude if geocoder_result.longitude

    self.indexed_at = DateTime.now

    save!
  end
end
