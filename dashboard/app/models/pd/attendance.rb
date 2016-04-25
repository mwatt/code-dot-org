# == Schema Information
#
# Table name: pd_attendances
#
#  id            :integer          not null, primary key
#  pd_session_id :integer          not null
#  teacher_id    :integer          not null
#  created_at    :datetime
#  updated_at    :datetime
#
# Indexes
#
#  index_pd_attendances_on_pd_session_id  (pd_session_id)
#

class Pd::Attendance < ActiveRecord::Base
  belongs_to :session, class_name: 'Pd::Session', foreign_key: :pd_session_id
  belongs_to :teacher, class_name: 'User', foreign_key: :teacher_id

  has_one :workshop, class_name: 'Pd::Workshop', through: :session

  def self.for_teacher_in_workshop(teacher, workshop)
    self.joins(:workshop).where(teacher_id: teacher.id, pd_workshops: {id: workshop.id})
  end

  def self.for_districts(district_ids)
    self.joins(teacher: {districts_users: :district}).where(districts_users: {district_id: district_ids})
  end

  def self.distinct_teachers(workshop = nil)
    attendances = workshop ? self.joins(:workshop).where(pd_workshops: {id: workshop.id}) : self.all
    User.where(id: attendances.select(:teacher_id).distinct)
  end
end
