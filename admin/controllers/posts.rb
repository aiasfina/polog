Polog::Admin.controllers :posts do
  get :index, provides: [:html, :json] do
    case content_type
      when :html then render 'posts/index'
      when :json then
        @posts = Post.order(id: :desc)
        Rabl::Renderer.json(@posts, 'posts/index', view_path: 'admin/views')
    end
  end

  get :show, with: :id, provides: :json do
    @post = current_account.posts.find(params[:id])
    if @post
      Rabl::Renderer.json(@post, 'posts/show', view_path: 'admin/views')
    else
      halt 404
    end
  end

  get :new do
    render 'posts/new'
  end

  post :create, provides: :json do
    @post = current_account.posts.build params[:post]
    @post.content_html = @post.markdown_convert
    if @post.save
      Rabl::Renderer.json(@post, 'posts/show', view_path: 'admin/views')
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
      @post.attributes = params[:post]
      @post.content_html = @post.markdown_convert
      if @post.save
        Rabl::Renderer.json(@post, 'posts/show', view_path: 'admin/views')
      else
        halt 500
      end
    else
      halt 404
    end
  end

  put :publish, with: :id, provides: :json do
    @post = current_account.posts.where(id: params[:id]).first
    if @post
      if @post.update published: params[:published]
        {published_at: @post.published_at}.to_json
      else
        halt 500
      end
    else
      halt 404
    end
  end

  delete :destroy, with: :id, provides: :json do
    @post = current_account.posts.where(id: params[:id]).first
    if @post
      @post.destroy
    else
      halt 404
    end
  end
end
