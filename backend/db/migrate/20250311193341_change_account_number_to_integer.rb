class ChangeAccountNumberToInteger < ActiveRecord::Migration[8.0]
  def up
    # First add new integer column
    add_column :bank_accounts, :account_number_int, :integer, limit: 8

    # Copy data (only if existing data is numeric)
    BankAccount.reset_column_information
    BankAccount.find_each do |ba|
      ba.update(account_number_int: ba.account_number.to_i)
    end

    # Remove old column
    remove_column :bank_accounts, :account_number

    # Rename new column
    rename_column :bank_accounts, :account_number_int, :account_number
  end

  def down
    # Reverse process for rollback
    add_column :bank_accounts, :account_number_str, :string

    BankAccount.reset_column_information
    BankAccount.find_each do |ba|
      ba.update(account_number_str: ba.account_number.to_s)
    end

    remove_column :bank_accounts, :account_number
    rename_column :bank_accounts, :account_number_str, :account_number
  end
end
