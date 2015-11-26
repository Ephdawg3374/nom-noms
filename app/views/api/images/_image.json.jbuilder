json.extract!(image, :review_id)

json.medium_url asset_path(image.image_pic.url(:medium))
