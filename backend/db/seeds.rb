# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.destroy_all
Category.destroy_all
BankAccount.destroy_all

user = User.create!(
  name: 'Demo User',
  email: 'demo@expensetracker.com'
)

BankAccount.create!([
{
  user: user,
  bank_name: 'Lloyds',
  account_name: 'Current',
  account_number: '12345678',
  sortcode: '123456',
  account_type: 'Current',
  balance: 1000.00
},
{
  user: user,
  bank_name: 'Natwest',
  account_name: 'My Savings',
  account_number: '98765432',
  sortcode: '654321',
  account_type: 'Savings',
  balance: 15_000.00
},
{
  user: user,
  bank_name: 'Santander',
  account_name: 'Credit',
  account_number: '12121212',
  sortcode: '121212',
  account_type: 'Credit',
  balance: -9_000.00
}
])

expense_categories = [ 'Groceries', 'Rent', 'Transport', 'Utilities' ]
income_categories = [ 'Salary', 'Freelance', 'Investments', 'Side Projects' ]

expense_categories.each do |name|
  Category.create!(
    name: name,
    category_type: 'expense',
    user: user
  )
end

income_categories.each do |name|
  Category.create!(
    name: name,
    category_type: 'income',
    user: user
  )
end

expenses = [
  {
    bank_account: BankAccount.find_by(account_name: 'Current'),
    category: Category.find_by(name: 'Groceries', category_type: 'expense'),
    amount: 50.00,
    description: 'Weekly groceries',
    date: Date.today - 5
  },
  {
    bank_account: BankAccount.find_by(account_name: 'Current'),
    category: Category.find_by(name: 'Rent', category_type: 'expense'),
    amount: 500.00,
    description: 'Monthly rent',
    date: Date.today - 15
  },
  {
    bank_account: BankAccount.find_by(account_name: 'My Savings'),
    category: Category.find_by(name: 'Transport', category_type: 'expense'),
    amount: 15.00,
    description: 'Bus fare',
    date: Date.today - 1
  },
  {
    bank_account: BankAccount.find_by(account_name: 'Credit'),
    category: Category.find_by(name: 'Utilities', category_type: 'expense'),
    amount: 120.00,
    description: 'Electricity bill',
    date: Date.today - 10
  }
]

incomes = [
  {
    bank_account: BankAccount.find_by(account_name: 'Current'),
    category: Category.find_by(name: 'Salary', category_type: 'income'),
    amount: 2000.00,
    description: 'Monthly salary',
    date: Date.today - 20
  },
  {
    bank_account: BankAccount.find_by(account_name: 'My Savings'),
    category: Category.find_by(name: 'Freelance', category_type: 'income'),
    amount: 300.00,
    description: 'Freelance project',
    date: Date.today - 7
  },
  {
    bank_account: BankAccount.find_by(account_name: 'Credit'),
    category: Category.find_by(name: 'Investments', category_type: 'income'),
    amount: 150.00,
    description: 'Stock dividend',
    date: Date.today - 3
  },
  {
    bank_account: BankAccount.find_by(account_name: 'Current'),
    category: Category.find_by(name: 'Side Projects', category_type: 'income'),
    amount: 100.00,
    description: 'Side project earnings',
    date: Date.today - 2
  }
]

transactions = expenses + incomes
transactions.each do |attrs|
  transaction_type = attrs[:category].category_type == 'income' ? :income : :expense
  
  Transaction.create!(
    bank_account: attrs[:bank_account],
    category: attrs[:category],
    amount: attrs[:amount].abs,
    description: attrs[:description],
    date: attrs[:date],
    transaction_type: transaction_type
  )
end