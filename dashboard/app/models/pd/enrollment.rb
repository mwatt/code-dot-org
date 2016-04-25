# == Schema Information
#
# Table name: pd_enrollments
#
#  id             :integer          not null, primary key
#  pd_workshop_id :integer          not null
#  name           :string(255)      not null
#  email          :string(255)      not null
#  created_at     :datetime
#  updated_at     :datetime
#  district_id    :integer
#  school         :string(255)
#  code           :string(255)
#
# Indexes
#
#  index_pd_enrollments_on_pd_workshop_id  (pd_workshop_id)
#

class Pd::Enrollment < ActiveRecord::Base
  belongs_to :workshop, class_name: 'Pd::Workshop', foreign_key: :pd_workshop_id
  belongs_to :district

  validates :name, :email, :district_id, :school, presence: true
  validates_confirmation_of :email

  before_create :assign_code
  def assign_code
    self.code = unused_random_code
  end

  def user
    User.find_by_email_or_hashed_email self.email
  end

  def district_name
    nil
  end
  def district_name=(name)
    self.district = District.find_by(name: name)
  end


  private

  def unused_random_code
    loop do
      code = SecureRandom.hex(10)
      return code unless Pd::Enrollment.exists?(code: code)
    end
  end
end
