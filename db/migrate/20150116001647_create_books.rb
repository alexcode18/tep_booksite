class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.text :description
      t.string :isbn
      t.string :imprint
      t.string :copyright
      t.string :cover_price
      

      t.timestamps null: false
    end
  end
end