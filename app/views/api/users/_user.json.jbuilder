json.extract! user, :username, :id
json.large_url asset_path(user.profile_pic.url(:large))
json.large_url asset_path(user.profile_pic.url(:thumb))
