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

10000.times do
    Location.create!(
      location_type: location_types[rand(0..10)],
      name: Faker::Company.name,
      description: Faker::Company.bs,
      price_range: "$" * rand(1..4),
      website: Faker::Internet.url,
      phone_number: "(#{rand.to_s[2..4]})#{rand.to_s[2..4]}-#{rand.to_s[2..5]}",
      street_address: Faker::Address.street_address,
      city: Faker::Address.city,
      state: Faker::Address.state_abbr,
      zipcode: Faker::Address.zip[0..4],
      lat: Faker::Address.latitude.to_f.round(6),
      lng: Faker::Address.longitude.to_f.round(6)
    )
end
