class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :review_id, null: false
    end

    add_attachment :images, :image_pic
  end
end
