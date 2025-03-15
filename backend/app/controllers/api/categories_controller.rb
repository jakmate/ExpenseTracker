# frozen_string_literal: true

module Api
  class CategoriesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      @categories = Category.where(category_type: params[:type])
      render json: @categories
    end
  end
end
