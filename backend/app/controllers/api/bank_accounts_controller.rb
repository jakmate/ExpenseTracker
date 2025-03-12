# frozen_string_literal: true

module Api
  class BankAccountsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      @bank_accounts = BankAccount.all
      render json: @bank_accounts, each_serializer: BankAccountSerializer
    end

    def create
      @bank_account = BankAccount.new(bank_account_params)
      if @bank_account.save
        render json: @bank_account, status: :created
      else
        render json: { errors: @bank_account.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def bank_account_params
      params.require(:bank_account).permit(
        :bank_name,
        :account_number,
        :account_type,
        :account_name,
        :sortcode,
        :balance,
        :user_id
      )
    end
  end
end
