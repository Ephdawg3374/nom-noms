class AddImgUrLtoLocationsTable < ActiveRecord::Migration
  def change
    add_column :locations, :img_url, :string
  end
end
