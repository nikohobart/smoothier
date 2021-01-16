import React from 'react';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes, onRecipeSelect }) => {
  const renderedList = recipes.map(recipe => {
    return (
      <RecipeItem
        key={recipe.id}
        recipe={recipe}
        onRecipeSelect={onRecipeSelect}
      />
    );
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default RecipeList;
