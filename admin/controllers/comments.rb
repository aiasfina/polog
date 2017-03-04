Polog::Admin.controllers :comments do
  get :index, provides: [:html, :json] do
    case content_type
    when :html then render 'comments/index'
    when :json then
      @comments = Comment.page(params[:page]).per(params[:per])
      jj_collection @comments, Comment.collection_json_attributes
    end
  end

  delete :destroy, with: :id, provides: :json do
    @comment = Comment.where(id: params[:id]).first
    if @comment
      if @comment.destroy
        halt 200
      else
        halt 500
      end
    else
      halt 405
    end
  end
end
