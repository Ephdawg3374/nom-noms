class Location < ActiveRecord::Base
  validates :location_type, :name, :description, :price_range,
            :street_address, :city, :state, :zipcode, :lat, :lng,
            presence: true

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

  def self.find_by_search_params(search_params)
    if search_params[:locationType].empty?
      location_type = "%"
    else
      location_type = search_params[:locationType].downcase
    end

    location_address = search_params[:locationAddress].split(",")

    location_address.each_with_index do |address_el, idx|
      address_el = address_el.split(" ")

      if address_el.length > 1
        address_el.each do |address_el_pronoun|
          address_el_pronoun.capitalize!
        end
      else
        if address_el[0].length == 2
          address_el[0].upcase!
        end
      end

      location_address[idx] = address_el.join(" ")
    end

    if location_address.length == 1
      # general address search
      Location.where(
        ("location_type LIKE ? AND
        (street_address = ? OR city = ? OR state = ?
        OR zipcode = ?)"),
        location_type, location_address[0], location_address[0], location_address[0], location_address[0]
      )
    else
      # city, state search
      Location.where(
        ("location_type = ? AND
        (city = ? AND state = ?)"),
        location_type, location_address[0], location_address[1]
      )
    end

  end
end
