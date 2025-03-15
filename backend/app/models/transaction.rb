# frozen_string_literal: true

class Transaction < ApplicationRecord
  validates :amount, presence: true
  validates :date, presence: true
  validates :category_id, presence: true
  validates :bank_account_id, presence: true
  belongs_to :bank_account
  belongs_to :category
end
