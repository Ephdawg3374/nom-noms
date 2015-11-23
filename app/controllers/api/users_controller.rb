class Api::UsersController < ApplicationController
  def create
    @new_user = User.new(user_params)

    if @new_user.save
      login!(@new_user)
      render :show
    else
      render json: @new_user.errors.full_messages, status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :profilePic)
  end

end
