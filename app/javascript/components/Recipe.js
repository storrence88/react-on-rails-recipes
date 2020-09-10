import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Recipe = (props) => {
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    const { match: { params: { id } } } = props;

    const url = `/api/v1/recipe/${id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((response) => setRecipe({ recipe: { response } }))
      .catch(() => this.props.history.push('/recipes'));
  }, []);

  return <div />;
};

export default Recipe;
