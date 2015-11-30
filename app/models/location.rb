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
    location_type.empty? ? location_type = "%" : location_type = "%" + parse_location_type(location_type).join("%") + "%"

    search_location_coords = Location.get_search_loc_coords(area)

    sql_query_params = {
      lat: search_location_coords[0],
      lng: search_location_coords[1],
      distance: distance,
      location_type: location_type,
      price_range: price_range
    }

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

  def self.parse_location_type(location_type)
    location_type = location_type.split(" ")

    location_type.map! do |type_el|
      type_el == "and" ? type_el.downcase : type_el.capitalize
    end
    location_type
  end

  def self.parse_location(location)
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

    loc_type_partial = "%" + parse_location(loc_type_partial)[0] + "%"

    types = Location.select(:location_type)
      .where("location_type LIKE ?", loc_type_partial)
      .distinct.limit(3)

    cuisines = Location.select(:cuisine)
      .where("cuisine LIKE ?", loc_type_partial)
      .distinct.limit(3)

    names = Location.find_by_sql([
      "SELECT
        locations.name
      FROM
        locations
      LEFT OUTER JOIN
        reviews
      ON
        reviews.location_id = locations.id
      WHERE
        locations.name LIKE ?
      GROUP BY
        locations.name
      ORDER BY
        avg(reviews.rating) DESC
      LIMIT
        3",
      loc_type_partial])

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
