class TransactionSerializer < ActiveModel::Serializer
    attributes :id, :amount, :description, :date, :category_id, :bank_account_id
end
