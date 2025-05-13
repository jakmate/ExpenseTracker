# frozen_string_literal: true

class Budget < ApplicationRecord
  belongs_to :user
  belongs_to :category

  enum :budget_type, { weekly: 0, monthly: 1, custom: 2 }

  validates :user_id, :category_id, :budget_type, :amount, presence: true
  validates :amount, numericality: { greater_than: 0 }
end
