class Api::ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)

    @image.save

    render :show
  end

  private

  def image_params
    params.require(:image).permit(:review_id, :image_pic)
  end

end
