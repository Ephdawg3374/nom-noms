class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :location_type, null: false
      t.string :name, null: false
      t.text :description, null: false
      t.integer :price_range, null: false, limit: 1
      t.string :website
      t.string :phone_number
      t.string :street_address, null: false
      t.string :city, null: false
      t.string :state, null: false, limit: 2
      t.string :zipcode, null: false, limit: 5
      t.float :lat, null: false
      t.float :lng, null: false
    end
  end
end
