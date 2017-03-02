Polog::Admin.controllers :accounts do
  get :index, provides: [:html, :json] do
    @title = "Accounts"

    case content_type
      when :html then render 'accounts/index'
      when :json then
        @accounts = Account.order(id: :desc)
        Rabl::Renderer.json(@accounts, 'accounts/index', view_path: 'admin/views')
    end
  end

  get :new do
    @account = Account.new
    render 'accounts/new'
  end

  post :create, provides: :json do
    @account = Account.new(params[:account])
    if @account.save
      Rabl::Renderer.json(@account, 'accounts/show', view_path: 'admin/views')
    else
      halt 500
    end
  end

  put :update, with: :id, provides: :json do
    @account = Account.find(params[:id])
    if @account
      if @account.update_attributes(params[:account])
        Rabl::Renderer.json(@account, 'accounts/show', view_path: 'admin/views')
      else
        halt 500
      end
    else
      halt 404
    end
  end

  delete :destroy, :with => :id do
    @title = "Accounts"
    account = Account.find(params[:id])
    if account
      if account != current_account && account.destroy
        flash[:success] = pat(:delete_success, :model => 'Account', :id => "#{params[:id]}")
      else
        flash[:error] = pat(:delete_error, :model => 'account')
      end
      redirect url(:accounts, :index)
    else
      flash[:warning] = pat(:delete_warning, :model => 'account', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy_many do
    @title = "Accounts"
    unless params[:account_ids]
      flash[:error] = pat(:destroy_many_error, :model => 'account')
      redirect(url(:accounts, :index))
    end
    ids = params[:account_ids].split(',').map(&:strip)
    accounts = Account.find(ids)
    
    if accounts.include? current_account
      flash[:error] = pat(:delete_error, :model => 'account')
    elsif Account.destroy accounts
    
      flash[:success] = pat(:destroy_many_success, :model => 'Accounts', :ids => "#{ids.join(', ')}")
    end
    redirect url(:accounts, :index)
  end
end
