# frozen_string_literal: true

class AddBankDetailsToBankAccounts < ActiveRecord::Migration[8.0]
  def change
    add_column :bank_accounts, :bank_name, :string
    add_column :bank_accounts, :account_type, :string
  end
end
