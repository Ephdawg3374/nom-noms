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

# Longitudes and latidues for randomly generated locations will be bounded
# within the NY-NJ area around NYC. This is so that results look more realistic
# in google maps component.

# Bounding Box
# NW 40.914568, -74.287911
# SW 40.627187, -74.287911
# NE 40.914568, -73.799629
# SE 40.627187, -73.799629

# All other location attributes (besides state) will be fake!
locations = {
  0 => ["NY", "New York"],
  1 => ["NJ", "New Jersey"]
}

def generate_random_zipcode(state)
  case state
  when "NY"; return rand(10001..14975).to_s
  when "NJ"; return rand(7001..8989).to_s.rjust(5, "0")
  end
end

def generate_random_lat
  rand(40.627187..40.914568).round(6)
end

def generate_random_lng(state)
  case state
  when "NY"; return rand(-74.007169..-73.799629).round(6)
  when "NJ"; return rand(-74.287911..-74.007169).round(6)
  end
end

6000.times do
  rand_loc_img_type = rand(10)
  rand_img_number = rand(1..10)
  rand_loc_number = rand(2)

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
    lat: generate_random_lat,
    lng: generate_random_lng(locations[rand_loc_number][0])
  )
end
