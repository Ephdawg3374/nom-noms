json.array!(@locations) do |location|
  json.partial!('location', location: location)
end
