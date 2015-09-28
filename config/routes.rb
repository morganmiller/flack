Rails.application.routes.draw do
  root 'channels#index'

  resources :channels, only: [:show]
  resources :messages, only: [:create]

  get '/signup' => 'users#new'
  post '/users' => 'users#create'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
end
