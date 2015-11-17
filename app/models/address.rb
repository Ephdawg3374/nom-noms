class Address < ActiveRecord::Base
  validates :street_address, :city, :state, :zipcode, :lat, :lng, presence: true

  belongs_to :location
end
