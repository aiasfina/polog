class Post < ActiveRecord::Base
  belongs_to :account

  def published=(bool)
    self.published_at = bool ? DateTime.now : nil
  end

  def published
    !!self.published_at
  end
end
