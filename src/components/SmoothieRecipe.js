import './SmoothieRecipe.css';

import React from 'react';
import Image from 'react-bootstrap/Image';

const SmoothieRecipe = ({
  smoothie,
  recipes,
  setRecipes,
  onRecipeDelete,
  openModal,
}) => {
  // render ingredients -- change into separate component?
  const ingredientsList = smoothie.ingredients.map((obj, i) => {
    return (
      <div key={obj.id} className="item">
        <h5 className="ingredient-el">
          Ingredient {i + 1}: {obj.quantity} {obj.name}
        </h5>
      </div>
    );
  });

  const deleteRecipe = () => {
    const i = recipes.findIndex(rec => rec.id === smoothie.id);
    const new_rec = [...recipes.slice(0, i), ...recipes.slice(i + 1)];
    setRecipes(new_rec);
    onRecipeDelete(new_rec[0]);
  };

  return (
    //className="ui grid container"
    <React.Fragment>
      <div className="ui two column grid row recipe-header">
        <div className="eight wide column">
          <h4>{smoothie.name}</h4>
          <p>{smoothie.notes}</p>
          <button className="ui icon button" onClick={openModal}>
            <i className="icon edit"></i>
          </button>
          <button className="ui icon button" onClick={deleteRecipe}>
            <i className="icon trash alternate"></i>
          </button>
        </div>
        <div className="eight wide column">
          <Image className="img" src={smoothie.image_url} />
        </div>
      </div>
      <div className="ui row ingredients-container">
        <div className="ui large relaxed list">{ingredientsList}</div>
      </div>
    </React.Fragment>
  );
};

export default SmoothieRecipe;
