class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render "api/sessions/show"
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

  def show
    @user = User.find(params[:user][:userId])

    if @user
      render :show
    else
      render json: ["User not found!"], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :profile_pic)
  end

end
