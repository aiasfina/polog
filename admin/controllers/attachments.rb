Polog::Admin.controllers :attachments do  
  get :index do
    render 'attachments/index'
  end

  post :create do
    attachment = current_account.attachments.build(file: params[:file])
    if attachment.save
      
    else
      halt 500
    end
  end
end
