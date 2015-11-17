class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by(username: params[:user][:username])
      .try(:authenticate, params[:user][:password])

    if @user
      login!(@user)

      flash[:notice] = ["Welcome back #{@user.username}!"]

      redirect_to root_url
    else
      flash.now[:failure] = @user.errors.full_messages
      render :new
    end
  end

  def destroy
    logout!

    redirect_to root
  end
end
