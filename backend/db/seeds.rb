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
