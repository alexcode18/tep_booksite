class BooksTags < ActiveRecord::Migration
  def change
  	create_table :books_tags, :id => false do |t|
      t.references :book
      t.references :tag
    end
  end
end
