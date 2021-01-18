import React, { useEffect, useState } from 'react';

import FormModal from './FormModal';
import RecipeList from './RecipeList';
import SearchBar from './SearchBar';
import SmoothieRecipe from './SmoothieRecipe';
import { get } from '../api/api';

const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const search = async term => {
    const new_val = await get(term);
    setRecipes(new_val);
  };

  useEffect(() => {
    search('');
  }, []);

  useEffect(() => {
    setSelectedRecipe(recipes[0]);
    //console.log('setselectedrecipe triggered', recipes[0]);
  }, [recipes]);

  return (
    <div className="ui grid container">
      <div
        className="ui row"
        style={{
          backgroundColor: 'lightgray',
          borderRadius: '10px 10px 0 0',
          marginTop: '14px',
        }}
      >
        <h2 className="four wide column">Smoothier</h2>
        <div className="eight wide column">
          <SearchBar onSearch={search} />
        </div>
        <div className="four wide column">
          <button
            className="ui basic button"
            onClick={() => setModalShow(true)}
          >
            <i className="plus square icon"></i>
            Add Recipe
          </button>

          <FormModal
            show={modalShow}
            hideModal={() => setModalShow(false)}
            recipes={recipes}
            setRecipes={setRecipes}
            toEdit={toEdit}
            setToEdit={setToEdit}
          />
        </div>
      </div>
      <div className="ui row">
        <div
          className="five wide column"
          style={{ backgroundColor: 'azure', marginTop: '-14px' }}
        >
          <h1>Search Results</h1>
          <RecipeList recipes={recipes} onRecipeSelect={setSelectedRecipe} />
        </div>
        <div className="eleven wide column">
          <SmoothieRecipe
            smoothie={selectedRecipe}
            recipes={recipes}
            setRecipes={setRecipes}
            openModal={() => {
              setToEdit(selectedRecipe);
              setModalShow(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
