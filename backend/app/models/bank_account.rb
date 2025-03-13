# frozen_string_literal: true

class BankAccount < ApplicationRecord
  belongs_to :user
  validates :account_name, presence: true
  validates :account_type, presence: true
  validates :account_number, presence: true, uniqueness: true
  validates :sortcode, presence: true
  validates :bank_name, presence: true
  validates :balance, presence: true
end
