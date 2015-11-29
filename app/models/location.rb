class Location < ActiveRecord::Base
  validates :location_type, :name, :description, :price_range,
            :street_address, :city, :state, :zipcode, :lat, :lng,
            presence: true

  has_many :reviews, dependent: :destroy

  def self.find_locations(search_params)
    distance = search_params[:distanceRange].to_f
    area = search_params[:searchArea]
    location_type = search_params[:searchType]
    price_range = search_params[:priceRange]

    price_range = "%" if search_params[:priceRange] == "All"
    # pull all location types if no type specified
    location_type = "%" if location_type.empty?

    search_location_coords = Location.get_search_loc_coords(area)

    sql_query_params = {
      lat: search_location_coords[0],
      lng: search_location_coords[1],
      distance: distance,
      location_type: location_type,
      price_range: price_range
    }

    exact_loc_match = Location.where("locations.name = ?", location_type)

    # if loc type search matches an exact name location, search for locations with that
    # name and ignore price range filter (but respect distacne range filter)
    if exact_loc_match.empty?
      Location.find_by_sql [
        "SELECT
          *
        FROM
          (
            SELECT
              locations.*,
               asin(
                sqrt(
                  sin(radians(:lat-lat)/2)^2 +
                  sin(radians(:lng-lng)/2)^2 *
                  cos(radians(:lat)) *
                  cos(radians(:lng))
                  )
                ) * 7926.3352 AS distance
            FROM
              locations
          ) AS loc_w_distance
        WHERE
          loc_w_distance.distance < :distance AND
          (location_type LIKE :location_type OR
          cuisine LIKE :location_type OR
          name LIKE :location_type) AND
          price_range LIKE :price_range
        ORDER BY
          loc_w_distance.distance
        LIMIT
          100",
        sql_query_params]
    else
      Location.find_by_sql [
        "SELECT
          *
        FROM
          (
            SELECT
              locations.*,
               asin(
                sqrt(
                  sin(radians(:lat-lat)/2)^2 +
                  sin(radians(:lng-lng)/2)^2 *
                  cos(radians(:lat)) *
                  cos(radians(:lng))
                  )
                ) * 7926.3352 AS distance
            FROM
              locations
          ) AS loc_w_distance
        WHERE
          loc_w_distance.distance < :distance AND
          name = :location_type
        ORDER BY
          loc_w_distance.distance",
        sql_query_params]
      end
  end

  def self.get_search_loc_coords(search_location)
    search_location = Location.parse_location(search_location)[0]

    search_location = Location.where(city: search_location).limit(1).first

    if search_location
      [search_location.lat, search_location.lng]
    else
      [40.730610, -73.935242]
    end
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
    # if location.length == 2
    #   return location.upcase
    # end

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

    loc_type_partial = loc_type_partial.capitalize + "%"

    types = Location.select(:location_type)
      .where("location_type LIKE ?", loc_type_partial)
      .distinct.limit(3)

    cuisines = Location.select(:cuisine)
      .where("cuisine LIKE ?", loc_type_partial)
      .distinct.limit(3)

    names = Location.find_by_sql(
      "SELECT
        locations.name
      FROM
        locations
      JOIN
        reviews
      ON
        reviews.location_id = locations.id
      GROUP BY
        locations.id
      ORDER BY
        avg(reviews.rating) DESC"
      )
    # names = Location.select(:name, :reviews)
    #   .where("name LIKE ?", loc_type_partial).order().limit(3)
    (types + cuisines + names)
  end

  def self.find_valid_location_areas(loc_area_partial)
    if loc_area_partial.length <= 1
      return []
    end

    loc_area_partial = parse_location(loc_area_partial)[0] + "%"

    cities = Location.select(:city, :state)
      .where("city LIKE ?", loc_area_partial)
      .distinct.limit(5)

    cities
  end

end
