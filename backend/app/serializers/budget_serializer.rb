class BudgetSerializer < ActiveModel::Serializer
    attributes :id, :amount, :budget_type, :category_id, :created_at
    belongs_to :category
end
