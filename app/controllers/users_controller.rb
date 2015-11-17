class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params, password_confirmation: 'nomatch')

    if @user.save
      login!(@user)

      flash[:notice] = ["Welcome #{@user.username}!"]
      redirect_to root_url
    else
      flash.now[:failure] = @user.errors.full_messages
      render :new
    end
  end


  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
