# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Create random locations with addresses
Location.destroy_all

location_types = {
  0 => "restaurant",
  1 => "cafe",
  2 => "gym",
  3 => "library",
  4 => "bar",
  5 => "retail",
  6 => "theater",
  7 => "school",
  8 => "barber",
  9 => "park",
  10 => "club"
}

# placeholder images will be requested from http://lorempixel.com/
img_types = {
  0 => "food",
  1 => "food",
  2 => "sports",
  3 => "city",
  4 => "nightlife",
  5 => "fashion",
  6 => "abstract",
  7 => "city",
  8 => "people",
  9 => "nature",
  10 => "nightlife"
}

# app will be limited to locations within the Tri-State area (NY, PA, NJ)
# City, State Zipcode combinations will be legitimate
# Street address will be fake!
locations = {
  0 => ["NY", "New York"],
  1 => ["PA", "Pennsylvania"],
  2 => ["NJ", "New Jersey"]
}

def generate_random_zipcode(state)
  # NY zipcode range: 10001 - 14975
  # PA zipcode range: 15001 - 19640
  # NJ zipcode range: 7001 - 8989
  case state
  when "NY"; return rand(10001..14975).to_s
  when "PA"; return rand(15001..19640).to_s
  when "NJ"; return rand(7001..8989).to_s.rjust(5, "0")
  end

end

def generate_random_lat(state)
  # NY lat range: -80.5297851563 -
  # PA lat range:
  # NJ lat range:
end

def generate_random_lng(state)
  # NY lng range:
  # PA lng range:
  # NJ lng range:
end

10000.times do
  rand_loc_img_type = rand(10)
  rand_img_number = rand(1..10)
  rand_loc_number = rand(3)

  # still need to generate random lat/lng within bounds of NY/PA/NJ so
  # map results look more legitimate
  Location.create!(
    location_type: location_types[rand_loc_img_type],
    img_url: "http://lorempixel.com/400/200/#{img_types[rand_loc_img_type]}/#{rand_img_number}",
    name: Faker::Company.name,
    description: Faker::Company.bs,
    price_range: "$" * rand(1..4),
    website: Faker::Internet.url,
    phone_number: "(#{rand.to_s[2..4]})#{rand.to_s[2..4]}-#{rand.to_s[2..5]}",
    street_address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: locations[rand_loc_number][0],
    state_long: locations[rand_loc_number][1],
    zipcode: generate_random_zipcode(locations[rand_loc_number][0]),
    lat: Faker::Address.latitude.to_f.round(6),
    lng: Faker::Address.longitude.to_f.round(6)
  )
end
