Polog::Admin.controllers :posts do
  get :index, provides: [:html, :json] do

    case content_type
      when :html then render 'posts/index'
      when :json then
        @posts = Post.order(id: :desc)
        @posts.to_json
    end
  end
end
