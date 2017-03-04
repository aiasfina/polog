class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :account

  def self.collection_json_attributes
    [
      :id, :content,
      -> (c) { {post_id: c.post.id} },
      -> (c) { {post_title: c.post.title} },
      -> (c) { {account_id: c.account.id} },
      -> (c) { {account_name: c.account.name} }
    ]
  end

  def self.object_json_attributes
    collection_json_attributes
  end
end
