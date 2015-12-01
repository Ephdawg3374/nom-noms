json.extract! @user, :username, :firstname, :lastname, :id
json.tiny_url asset_path(@user.profile_pic.url(:tiny))
