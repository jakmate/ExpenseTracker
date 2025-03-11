# frozen_string_literal: true

class CreateBankAccounts < ActiveRecord::Migration[8.0]
  def change
    create_table :bank_accounts do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :account_number
      t.decimal :balance

      t.timestamps
    end
  end
end
