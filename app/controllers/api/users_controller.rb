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

  def index
    if !params[:userSearchAutoComplete].nil?
      @users = User.find_users_autocomplete(params[:userSearchAutoComplete])
      render :index
    end
  end

  def show
    if !params[:id].nil?
      @user = User.find(params[:id].to_i)
    elsif !params[:username].nil?
      @user = User.find_by_username(params[:username])
    end

    if @user
      render :show
    else
      render json: ["User not found!"], status: 404
    end
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:username, :firstname, :lastname, :password, :profile_pic)
  end

end
