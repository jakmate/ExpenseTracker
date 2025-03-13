# frozen_string_literal: true

class BankAccountSerializer < ActiveModel::Serializer
  attributes :id, :bank_name, :account_number, :account_type, :account_name, :sortcode, :balance, :user_id
end
