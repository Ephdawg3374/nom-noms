class Api::LocationsController < ApplicationController
  def index
    # parsed_params = parse(params[:bounds])
    #
    # @locations = Bench.in_bounds(parsed_params)
    find_locations_by_params = Location.find_by_search_params(params[:search])
    @locations = Location.search_within_distance()

    render :index
  end

  def show
    @location = Location.find(params[:id])

    render :show
  end

  private

  def parse(params)
    parsed_params = Hash.new();

    parsed_params[:northEast] = {lat: params[:northEast][:lat].to_f,
                                  lng: params[:northEast][:lng].to_f}
    parsed_params[:southWest] = {lat: params[:southWest][:lat].to_f,
                                  lng: params[:southWest][:lng].to_f}
    parsed_params
  end

end
