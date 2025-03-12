# frozen_string_literal: true

class CreateBankAccounts < ActiveRecord::Migration[8.0]
  def change
    create_table :bank_accounts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :account_name, null: false, limit: 32
      t.string :bank_name, null: false, limit: 32
      t.integer :account_number, null: false, limit: 8
      t.string :sortcode, null: false, limit: 6
      t.string :account_type, null: false
      t.decimal :balance, null: false, precision: 16, scale: 2

      t.timestamps
    end

    add_index :bank_accounts, :account_number, unique: true
  end
end
