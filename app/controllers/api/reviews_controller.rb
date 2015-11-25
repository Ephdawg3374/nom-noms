class Api::ReviewsController < ApplicationController
  def create
    @review = Review.new(review_params)

    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages, status: 400
    end
  end

  private

  def review_params
    params.require(:review).permit(:user_id, :location_id, :rating, :body, tags: [])
  end
end
