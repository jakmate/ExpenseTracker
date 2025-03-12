# frozen_string_literal: true

class CreateCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :categories do |t|
      t.references :user, null: true, foreign_key: true
      t.string :name
      t.string :category_type

      t.timestamps
    end
  end
end
