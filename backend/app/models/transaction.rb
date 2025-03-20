# frozen_string_literal: true

class Transaction < ApplicationRecord
  enum :transaction_type, { expense: 0, income: 1 }

  validates :amount, presence: true
  validates :date, presence: true
  validates :category_id, presence: true
  validates :bank_account_id, presence: true
  validates :transaction_type, presence: true
  belongs_to :bank_account
  belongs_to :category

  before_validation :set_amount_sign

  private

  def set_amount_sign
    if income?
      self.amount = amount.abs
    else
      self.amount = -amount.abs
    end
  end
end
