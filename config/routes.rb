Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes', to: 'recipes#index'
      post 'recipes', to: 'recipes#create'
      get 'recipe/:id', to: 'recipes#show'
      delete 'recipe/:id', to: 'recipes#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
