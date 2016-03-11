# == Schema Information
#
# Table name: pd_sessions
#
#  id             :integer          not null, primary key
#  pd_workshop_id :integer
#  start          :datetime         not null
#  end            :datetime         not null
#  created_at     :datetime
#  updated_at     :datetime
#
# Indexes
#
#  index_pd_sessions_on_pd_workshop_id  (pd_workshop_id)
#

module Api
  module V1
    module Pd
      class SessionSerializer < ActiveModel::Serializer
        attributes :id, :start, :end
      end
    end
  end
end
