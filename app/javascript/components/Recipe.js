import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Recipe = (props) => {
  console.log('Inside component');
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    console.log('Inside useEffect');
    async function getRecipe() {
      const {
        match: {
          params: { id }
        }
      } = props;
      const url = `/api/v1/recipe/${id}`;

      console.log(url);

      await fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((response) => setRecipe(response))
        .catch(() => props.history.push('/recipes'));
    }
    getRecipe();
  }, []);

  console.log(recipe);
  const addHtmlEntities = (str) => String(str).replace(/&lt;/g, '<').replace(/&gt;/g, '>');

  let ingredientList = 'No ingredients available';

  if (recipe?.ingredients?.length > 0) {
    ingredientList = recipe?.ingredients?.split(',').map((ingredient, index) => (
      <li key={index} className='list-group-item'>
        {ingredient}
      </li>
    ));
  }

  const deleteRecipe = () => {
    var result = confirm('Are you sure?');
    if (result) {
      const {
        match: {
          params: { id }
        }
      } = props;
      const url = `/api/v1/recipe/${id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(url, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': token,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(() => props.history.push('/recipes'))
        .catch((error) => console.log(error.message));
    }
  };

  const recipeInstruction = addHtmlEntities(recipe.instructions);

  return (
    <div className=''>
      <div className='hero position-relative d-flex align-items-center justify-content-center'>
        <img
          src={recipe.image}
          alt={`${recipe.name} image`}
          className='img-fluid position-absolute'
        />
        <div className='overlay bg-dark position-absolute' />
        <h1 className='display-4 position-relative text-white'>{recipe.name}</h1>
      </div>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-sm-12 col-lg-3'>
            <ul className='list-group'>
              <h5 className='mb-2'>Ingredients</h5>
              {ingredientList}
            </ul>
          </div>
          <div className='col-sm-12 col-lg-7'>
            <h5 className='mb-2'>Preparation Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${recipeInstruction}`
              }}
            />
          </div>
          <div className='col-sm-12 col-lg-2'>
            <button type='button' className='btn btn-danger' onClick={deleteRecipe}>
              Delete Recipe
            </button>
          </div>
        </div>
        <Link to='/recipes' className='btn btn-link'>
          Back to recipes
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
