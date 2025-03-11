# frozen_string_literal: true

class Transaction < ApplicationRecord
  belongs_to :bank_account
  belongs_to :category
end
