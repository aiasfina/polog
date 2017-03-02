class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
      t.references :account, null: false
      t.string :title, null: false
      t.text :content, default: ''
      t.text :content_html, default: ''
      t.text :tags, array: true, default: []
      t.datetime :published_at
      t.datetime :deleted_at

      t.timestamps null: false
    end

    add_index :posts, :account_id
    add_index :posts, :tags, using: :gin
    add_index :posts, :published_at, order: { published_at: 'DESC NULLS LAST' }
    add_index :posts, :deleted_at
  end

  def self.down
    drop_table :posts
  end
end
