json.extract! @user, :username, :id
json.tiny_url asset_path(@user.profile_pic.url(:tiny))
