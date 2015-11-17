class LocationType < ActiveRecord::Base
  validates :location_type, presence: true
end
