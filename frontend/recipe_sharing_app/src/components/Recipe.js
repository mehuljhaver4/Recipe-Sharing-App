import React from 'react';

function Recipe({title, description, ingredients, instructions }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Description: {description}</p>
      <p>Ingredients: {ingredients}</p>
      <p>Instructions: {instructions}</p>
    </div>
  );
}

export default Recipe;
