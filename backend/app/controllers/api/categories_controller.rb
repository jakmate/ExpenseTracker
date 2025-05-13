# frozen_string_literal: true

module Api
  class CategoriesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      @categories =
        if params[:type].present?
          Category.where(category_type: params[:type])
        else
          Category.all
        end

      render json: @categories, each_serializer: CategorySerializer
    end
  end
end
