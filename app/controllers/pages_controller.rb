class PagesController < ApplicationController
  require 'net/http'

  def home
    @map_props = { favorites: Favorite.all }
  end

  def forecast
    lat = params[:lat]
    lng = params[:lng]

    result = Net::HTTP.get(URI.parse("https://api.darksky.net/forecast/97133b6a2dda8d7d1daf5187f6aded03/#{lat},#{lng}"))

    render json: result
  end

end
