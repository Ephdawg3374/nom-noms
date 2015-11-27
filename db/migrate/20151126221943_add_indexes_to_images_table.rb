class AddIndexesToImagesTable < ActiveRecord::Migration
  def change
    add_index :images, :user_id
    add_index :images, :review_id
  end
end
