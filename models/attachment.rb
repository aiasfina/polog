class Attachment < ActiveRecord::Base
  mount_uploader :file, FileUploader

  belongs_to :account

  def self.collection_json_attributes
    [
      :id,
      -> (a) { {url: a.file.url} },
      -> (a) { {extname: File.extname(a.file.path)[1..-1]} }
    ]
  end

  def self.object_json_attributes
    collection_json_attributes
  end
end
