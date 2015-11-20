class Api::UsersController < ApplicationController
  def create
    @new_user = User.new(user_params)

    if @new_user.save
      render json: @new_user
    else
      render json: { errors: ["There was an error with your request"] }, status: 400
    end
  end

  def show
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
