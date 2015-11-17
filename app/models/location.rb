class Location < ActiveRecord::Base
  validates :location_type, :name, :description, :price_range,
            :street_address, :city, :state, :zipcode, :lat, :lng,
            presence: true

  enum location_type: {
    restaurant: 0,
    cafe: 1,
    gym: 2,
    library: 3,
    bar: 4,
    retail: 5,
    theater: 6,
    school: 7,
    barber: 8,
    doctor: 9
  }

  def self.in_bounds(bounds)
    # bounds in the following format:
    # {
    #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
    #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
    # }
    in_bounds_locations = []

    lower_lat_bound = bounds[:southWest][:lat]
    upper_lat_bound = bounds[:northEast][:lat]

    lower_lng_bound = bounds[:southWest][:lng]
    upper_lng_bound = bounds[:northEast][:lng]

    Location.where(
        "(lat BETWEEN ? AND ?) AND (lng BETWEEN ? AND ?)",
        lower_lat_bound, upper_lat_bound,
        lower_lng_bound, upper_lng_bound
      )
  end

  def self.search_by_min_max_seating(min_seats, max_seats, benches)
    raise "min seats greater than max seats" if min_seats > max_seats

    benches.where(
        "(seating BETWEEN ? AND ?)",
        min_seats, max_seats
      )
  end
end
