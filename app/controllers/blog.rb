Polog::App.controllers :blog do
  
  get :index, map: '/' do
    @title = 'Blog'
    
    @posts = Post.where.not(published_at: nil).order(published_at: :desc).page(params[:page])
    render 'blog/index'
  end
end
