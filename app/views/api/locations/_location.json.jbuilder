json.extract!(
  location,
  :id, :location_type, :name, :description, :price_range, :website, :cuisine,
  :phone_number, :street_address, :city, :state, :zipcode, :lat, :lng, :img_url
)

json.ave_rating location.reviews.average(:rating).to_i
