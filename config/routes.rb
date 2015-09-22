Rails.application.routes.draw do
  root 'channels#index'

  resources :channels, only: [:show]
  resources :messages, only: [:create]
end
