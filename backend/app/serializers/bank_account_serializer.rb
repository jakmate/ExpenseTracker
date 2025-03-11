class BankAccountSerializer < ActiveModel::Serializer
    attributes :id, :bank_name, :account_number, :account_type, :balance, :user_id
end
