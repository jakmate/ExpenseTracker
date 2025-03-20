# frozen_string_literal: true

class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :amount, :description, :date, :category_id, :bank_account_id, :transaction_type
end
