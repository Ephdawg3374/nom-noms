class Api::SessionsController < ApplicationController

  def show
    unless current_user
      render json: {}
      return
    end

    @user = current_user
    render :show
  end

  def create
    username = session_params[:username]
    password = session_params[:password]

    @user = User.find_by(username: username).try(:authenticate, password)

    if @user.nil?
      render json: {errors: ["User not found!"]}, status: 401
    else
      login!(@user)
      render :show
    end
  end

  def destroy
    logout!
    render json: {}
  end

  private

  def session_params
    params.require(:user).permit(:username, :password)
  end
end
