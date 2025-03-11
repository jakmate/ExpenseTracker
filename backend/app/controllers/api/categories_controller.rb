class Api::CategoriesController < ApplicationController
    def index
        @categories = Category.where(category_type: params[:type])
        render json: @categories
    end
end
