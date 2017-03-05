class Post < ActiveRecord::Base
  belongs_to :account
  has_many :comments, dependent: :destroy

  def markdown_convert
    Kramdown::Document.new(content).to_html
  end

  def published=(bool)
    self.published_at = bool ? DateTime.now : nil
  end

  def published
    !!self.published_at
  end

  def self.collection_json_attributes
    [:id, :title, :published_at, :published]
  end

  def self.object_json_attributes
    [:id, :title, :content, :tags, :published_at, :published]
  end
end
