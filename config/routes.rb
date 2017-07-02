Rails.application.routes.draw do
  get 'forecast', to: 'pages#forecast'
  root 'pages#home'

  resources :favorites

end
