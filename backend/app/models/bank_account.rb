# frozen_string_literal: true

class BankAccount < ApplicationRecord
  belongs_to :user
end
