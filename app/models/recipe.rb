class Recipe < ApplicationRecord
  validates :name, :ingredients, :instructions, presence: true
end
