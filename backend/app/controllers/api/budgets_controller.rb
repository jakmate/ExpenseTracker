# frozen_string_literal: true

module Api
  class BudgetsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_budget, only: [ :update, :destroy ]

    def index
      @budgets = Budget.where(user_id: params[:user_id]).includes(:category)
      render json: @budgets, each_serializer: BudgetSerializer
    end

    def create
      @budget = Budget.new(budget_params)
      if @budget.save
        render json: @budget, status: :created
      else
        render json: @budget.errors, status: :unprocessable_entity
      end
    end

    def update
      if @budget.update(budget_params)
        render json: @budget
      else
        render json: @budget.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @budget.destroy
      head :no_content
    end

    private

    def set_budget
      @budget = Budget.find(params[:id])
    end

    def budget_params
      params.require(:budget).permit(:category_id, :budget_type, :amount, :user_id)
    end
  end
end
