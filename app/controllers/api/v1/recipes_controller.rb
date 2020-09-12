class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show destroy]

  def index
    recipes = Recipe.all.order(created_at: :desc)
    render json: recipes
  end

  def create
    recipe = Recipe.create!(recipe_params)
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def destroy
    recipe&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  private
  
  attr_reader :recipe
  
  def set_recipe
    @recipe ||= Recipe.find(params[:id])
  end

  def recipe_params
    params.permit(:name, :image, :ingredients, :instructions)
  end
end
