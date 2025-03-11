# frozen_string_literal: true

module Api
  class TransactionsController < ApplicationController
    def index
      @transactions = Transaction.all
      render json: @transactions
    end

    def create
      @transaction = Transaction.new(transaction_params)
      if @transaction.save
        update_bank_account_balance(@transaction)
        render json: @transaction, status: :created
      else
        render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def transaction_params
      params.require(:transaction).permit(
        :amount,
        :description,
        :date,
        :category_id,
        :bank_account_id
      )
    end

    def update_bank_account_balance(transaction)
      bank_account = BankAccount.find(transaction.bank_account_id)
      new_balance = bank_account.balance + transaction.amount
      bank_account.update(balance: new_balance)
    end
  end
end
