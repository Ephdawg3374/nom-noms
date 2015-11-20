class Api::LocationsController < ApplicationController
  def index
    if !params[:search].nil?
      @locations = Location.find_by_search_params(params[:search])

      if @locations
        render :index
      else
        render json: { errors: ["No results found."] }, status: 404
      end
    elsif !params[:locTypeAutoCompleteRequest].nil?
      @location_types = Location.find_valid_location_types(params[:locTypeAutoCompleteRequest])
      render json: @location_types
    elsif !params[:locAddressAutoCompleteRequest].nil?
      @location_areas = Location.find_valid_location_areas(params[:locAddressAutoCompleteRequest])
      render json: @location_areas
    else
      render json: { errors: ["There was an error with your request"] }, status: 400
    end

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
