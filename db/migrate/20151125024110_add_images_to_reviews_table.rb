class AddImagesToReviewsTable < ActiveRecord::Migration
  def change
    add_attachment :reviews, :images, array: true
  end
end
