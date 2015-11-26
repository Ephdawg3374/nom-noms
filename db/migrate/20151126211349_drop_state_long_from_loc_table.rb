class DropStateLongFromLocTable < ActiveRecord::Migration
  def change
    remove_column :locations, :state_long
  end
end
