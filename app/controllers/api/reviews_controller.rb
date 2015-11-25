class Api::ReviewsController < ApplicationController
  def create
    @review = Review.new(review_params)
    debugger
    if @review.save
      render :show
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

  private

  def user_params
    params.require(:review).permit(:user_id, :location_id, :rating, :body, tags: [], images: [])
  end
end
