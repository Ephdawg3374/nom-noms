class AddLongStateNameToLocationsTable < ActiveRecord::Migration
  def change
    add_column :locations, :state_long, :string, null: false
  end
end
