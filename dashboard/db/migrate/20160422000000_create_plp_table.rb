class CreatePlpTable < ActiveRecord::Migration
  def change
    create_table :plp do |t|
      t.string :name, null: false
      t.references :contact, null: false
      t.boolean :urban
    end
  end
end
