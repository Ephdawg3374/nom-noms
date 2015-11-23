json.extract! @user, :username
json.tiny_url asset_path(@user.profile_pic.url(:tiny))
