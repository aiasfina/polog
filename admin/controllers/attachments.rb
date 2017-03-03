Polog::Admin.controllers :attachments do  
  get :index, provides: [:html, :json] do
    case content_type
      when :html then render 'attachments/index'
      when :json then
        @attachments = Attachment.order(id: :desc).page(params[:page]).per(params[:per])
        jj_collection @attachments, Attachment.collection_json_attributes
    end
  end

  post :create do
    @attachment = current_account.attachments.build(file: params[:file])
    if @attachment.save
      jj_object @attachment, Attachment.object_json_attributes
    else
      halt 500
    end
  end
end
