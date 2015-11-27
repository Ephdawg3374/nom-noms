class Api::ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)

    @image.save

    render :show
  end

  def index
    @images = Image.where(review_id: params[:reviewId].to_i)

    render :index
  end

  private

  def image_params
    params.require(:image).permit(:review_id, :image_pic, :user_id)
  end

end
