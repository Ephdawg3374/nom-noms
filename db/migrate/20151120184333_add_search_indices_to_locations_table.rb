class AddSearchIndicesToLocationsTable < ActiveRecord::Migration
  def change
    add_index :locations, :location_type
    add_index :locations, :price_range
    add_index :locations, :city
  end
end
