class ChangeLocationTypeFromInTtoString < ActiveRecord::Migration
  def change
    remove_column :locations, :location_type
    add_column :locations, :location_type, :string, null: false
  end
end
