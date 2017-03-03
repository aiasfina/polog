Polog::Admin.controllers :attachments do  
  get :index, provides: [:html, :json] do
    case content_type
      when :html then render 'attachments/index'
      when :json then
        @attachments = Attachment.order(id: :desc)
        Rabl::Renderer.json(@attachments, 'attachments/index', view_path: 'admin/views')
    end
  end

  post :create do
    @attachment = current_account.attachments.build(file: params[:file])
    if @attachment.save
      Rabl::Renderer.json(@attachment, 'attachments/show', view_path: 'admin/views')
    else
      halt 500
    end
  end
end
