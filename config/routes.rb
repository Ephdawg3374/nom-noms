Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:create, :new]

  resource :session, only: [:create, :new, :destroy]

  namespace :api, defaults: {format: :json} do
   resources :locations, only: [:index, :show]
   resources :users, only: [:index, :create, :destroy, :show]
   resources :reviews, only: [:index, :create, :destroy]
   resources :images, only: [:index, :create]
   resource :session, only: [:create, :destroy, :show]
 end

end
