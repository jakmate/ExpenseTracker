# frozen_string_literal: true

class CreateTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :transactions do |t|
      t.references :bank_account, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.decimal :amount
      t.text :description

      t.timestamps
    end
  end
end
