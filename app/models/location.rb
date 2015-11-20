class Location < ActiveRecord::Base
  validates :location_type, :name, :description, :price_range,
            :street_address, :city, :state, :zipcode, :lat, :lng,
            presence: true

  def self.search_within_distance(locations, distance, search_location)
    # Distance will be in meters.

    search_location = Location.parse_location(search_location)[0]

    locations_within_distance = []

    search_location_in_db = Location.find_by_city(search_location)
    search_location_real = Location.actual_locations_for_searching[search_location]

    # if search location exists as a city in DB, use those coords
    if search_location_in_db
      search_location_coords = [
        search_location.lat,
        search_location.lng
      ]
    # if search location is an actual location (limited to the locations in
    # actual_locations_for_searching)
    elsif
      search_location_coords = [
        Location.actual_locations_for_searching[search_location]["lat"],
        Location.actual_locations_for_searching[search_location]["lng"]
      ]
    # NYC coords
    else
      search_location_coords = [40.730610, -73.935242]
    end

    locations.each do |location|
      loc_coord = [location.lat, location.lng]
      loc_dist = Location.calc_distance(loc_coord, search_location_coords)

      if loc_dist < distance
        locations_within_distance << location
      end
    end

    locations_within_distance
  end

  def self.find_by_search_params(search_params)
    # pull all location types if no type specified
    if search_params[:searchType].empty?
      location_type = "%"
    else
      location_type = search_params[:searchType].downcase
    end

    location_address = Location.parse_location(search_params[:searchArea])

    locations_by_params = Location.where(
      ("location_type LIKE ?"),
      location_type
    )

    Location.search_within_distance(
      locations_by_params,
      search_params[:distanceRange].to_f,
      search_params[:searchArea]
    )

  end

  def self.calc_distance(coord1, coord2)
    rad_per_deg = Math::PI/180  # PI / 180
    rkm = 6371                  # Earth radius in kilometers
    rm = rkm * 1000             # Radius in meters

    dlat_rad = (coord2[0]-coord1[0]) * rad_per_deg  # Delta, converted to rad
    dlon_rad = (coord2[1]-coord1[1]) * rad_per_deg

    lat1_rad, lon1_rad = coord1.map {|i| i * rad_per_deg }
    lat2_rad, lon2_rad = coord2.map {|i| i * rad_per_deg }

    a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))

    rm * c # Delta in meters
  end

  def self.actual_locations_for_searching

    # Location address search bar for this app will be limited to searching for
    # several real citys within the bounding box in which the random
    # locations are generated.  This is b/c app will search for locations
    # within distance from the area specificed in the location search bar (which will be
    # an ACTUAL acrea).  Default distance is 16093.4 meters (10miles)

    locations_for_searching = {
      "New York" => {"state" => "NY", "lat" => 40.730610, "lng" => -73.935242},
      "Brooklyn" => {"state" => "NY", "lat" => 40.650002, "lng" => -73.949997},
      "Manhattan" => {"state" => "NY", "lat" => 40.758896, "lng" => -73.985130},
      "Fort Lee" => {"state" => "NJ", "lat" => 40.8509300, "lng" => -73.9701400},
      "Hoboken" => {"state" => "NJ", "lat" => 40.7439900, "lng" => -74.0323600},
      "Englewood" => {"state" => "NJ", "lat" => 40.8928800, "lng" => -73.9726400},
      "Queens" => {"state" => "NY", "lat" => 40.742054, "lng" => -73.769417},
      "Bronx" => {"state" => "NY", "lat" => 40.837048, "lng" => -73.865433},
      "Yonkers" => {"state" => "NY", "lat" => 40.93121, "lng" => -73.898747},
      "New Rochelle" => {"state" => "NY", "lat" => 40.9114900, "lng" => -73.7823500}
    }
  end

  # parse the location coming from front-end to be ready for querying
  # handles lowercase
  def self.parse_location(location)
    # state abbr
    if location.length == 2
      return location.upcase
    end

    location_address = location.split(",")

    location_address.each_with_index do |address_el, idx|
      address_el = address_el.split(" ")

      address_el.map! do |address_el_pronoun|
        address_el_pronoun.capitalize
      end

      location_address[idx] = address_el.join(" ")
    end

    location_address
  end

  def self.find_valid_location_types(loc_type_partial)
    if loc_type_partial.length == 0
      return []
    end

    loc_type_partial = loc_type_partial + "%"

    Location.select(:location_type)
      .where("location_type LIKE ?", loc_type_partial)
      .distinct.limit(4)
  end

end
