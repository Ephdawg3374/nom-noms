class AddFirstAndLastNameToUserModel < ActiveRecord::Migration
  def change
    add_column :users, :firstname, :string, null: false
    add_column :users, :lastname, :string, null: false

    add_index :users, [:username, :firstname, :lastname]
  end
end
