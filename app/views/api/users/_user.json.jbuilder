json.extract! user, :username, :firstname, :lastname, :id

json.large_url asset_path(user.profile_pic.url(:avatar))

json.reviews user.reviews

image_urls = []
user.images.each { |image| image_urls.push(asset_path(image.image_pic.url(:medium))) }
json.images image_urls

#stats

json.num_reviews user.reviews.count
json.num_5_star_reviews user.reviews.where(rating: 5).count
json.num_4_star_reviews user.reviews.where(rating: 4).count
json.num_3_star_reviews user.reviews.where(rating: 3).count
json.num_2_star_reviews user.reviews.where(rating: 2).count
json.num_1_star_reviews user.reviews.where(rating: 1).count
