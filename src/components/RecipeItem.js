import './RecipeItem.css';

import React from 'react';

const RecipeItem = ({ recipe, onRecipeSelect }) => {
  const item_desc = recipe.notes.split(' ').splice(0, 6).join(' ');

  return (
    <div onClick={() => onRecipeSelect(recipe)} className="recipe-item item">
      <img
        className="ui avatar image"
        src={recipe.image_url}
        alt={recipe.name}
      />
      <div className="content">
        <div className="header">{recipe.name}</div>
        <div className="description">{item_desc + '...'}</div>
      </div>
    </div>
  );
};

export default RecipeItem;
