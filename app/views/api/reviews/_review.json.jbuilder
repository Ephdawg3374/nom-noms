json.extract!(review, :id, :rating, :body, :user_id, :location_id)

json.time_ago time_ago_in_words(review.created_at)
#reviewer thumbnail pic
json.user_thumbnail_url asset_path(review.author.profile_pic.url(:thumb))

json.author review.author.username

json.images []
