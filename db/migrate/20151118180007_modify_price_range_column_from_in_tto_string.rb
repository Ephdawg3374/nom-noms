class ModifyPriceRangeColumnFromInTtoString < ActiveRecord::Migration
  def change
    remove_column :locations, :price_range
    add_column :locations, :price_range, :string, null: false
  end
end
