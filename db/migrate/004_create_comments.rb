class CreateComments < ActiveRecord::Migration
  def self.up
    create_table :comments do |t|
      t.references :account, null: false
      t.references :post, null: false
      t.text :content, default: ''

      t.timestamps null: false
    end

    add_index :comments, :account_id
    add_index :comments, :post_id
  end

  def self.down
    drop_table :comments
  end
end
