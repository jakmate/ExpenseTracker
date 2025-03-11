# frozen_string_literal: true

class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :category_type, :user_id
end
