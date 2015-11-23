class FixSearchIndexesAndAddCuisineToLocationstable < ActiveRecord::Migration
  def change
    remove_index :locations, :city
    add_index :locations, [:lat, :lng]

    add_column :locations, :cuisine, :string
  end
end
