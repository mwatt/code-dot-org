class Api::V1::Pd::EnrollmentSerializer < ActiveModel::Serializer
  attributes :name, :email, :district_name, :school, :user_id

  def district_name
    object.district ? object.district.name : nil
  end

  def user_id
    object.user ? object.user.id : nil
  end
end
