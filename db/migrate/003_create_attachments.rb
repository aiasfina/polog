class CreateAttachments < ActiveRecord::Migration
  def self.up
    create_table :attachments do |t|
      t.references :account, null: false
      t.json :file
      t.timestamps null: false
    end
  end

  def self.down
    drop_table :attachments
  end
end
