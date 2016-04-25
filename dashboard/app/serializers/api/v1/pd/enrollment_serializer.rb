class Api::V1::Pd::EnrollmentSerializer < ActiveModel::Serializer
  attributes :name, :email, :district, :school, :user_id

  def user_id
    object.user ? object.user.id : nil
  end
end
