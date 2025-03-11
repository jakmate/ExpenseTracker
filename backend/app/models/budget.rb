# frozen_string_literal: true

class Budget < ApplicationRecord
  belongs_to :user
  belongs_to :category
end
