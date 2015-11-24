class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false
      t.integer :location_id, null: false

      t.integer :rating, null: false, default: 0
      t.text :body, null: false
      t.integer :tags, array: true, default: []

      t.timestamps null: false
    end

    add_index :reviews, :location_id
    add_index :reviews, :user_id
  end
end
