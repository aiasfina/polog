Polog::Admin.controllers :posts do
  get :index, provides: [:html, :json] do

    case content_type
      when :html then render 'posts/index'
      when :json then
        @posts = Post.select(:id, :title, :published_at).order(id: :desc)
        @posts.to_json
    end
  end

  get :show, with: :id, provides: :json do
    @post = current_account.posts.find(params[:id])
    if @post
      @post.to_json
    else
      halt 404
    end
  end

  get :new do
    render 'posts/new'
  end

  post :create, provides: :json do
    @post = current_account.posts.build params[:post]
    if @post.save
      @post.to_json
    else
      halt 500
    end
  end

  get :edit, with: :id do
    render 'posts/new'
  end

  put :update, with: :id, provides: :json do
    @post = current_account.posts.find(params[:id])
    if @post
      if @post.update_attributes params[:post]
        @post.to_json
      else
        halt 500
      end
    else
      halt 404
    end
  end
end
