import React from 'react';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes, onRecipeSelect }) => {
  if (!Array.isArray(recipes)) return <div>Loading...</div>;

  const renderedList = recipes.map(recipe => {
    return (
      <RecipeItem
        key={recipe.recipe_id}
        recipe={recipe}
        onRecipeSelect={onRecipeSelect}
      />
    );
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default RecipeList;
