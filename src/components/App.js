import React, { useState } from 'react';

import FormModal from './FormModal';
import RecipeList from './RecipeList';
import SearchBar from './SearchBar';
import SmoothieRecipe from './SmoothieRecipe';

// Sample Data
const smoothies = [
  {
    name: 'Avocado Blast',
    id: 12412412,
    image_url:
      'https://www.eatyourselfskinny.com/wp-content/uploads/2013/09/113.jpg',
    notes: `This is my favorite smoothie. It's so good and it's so good for you. Really good stuff. Avocados, yay.`,
    ingredients: [
      {
        name: 'Avocado',
        id: 123124,
        quantity: '1.5 lbs',
      },
      {
        name: 'Ice',
        id: 987651852,
        quantity: '2.3 cups',
      },
    ],
  },
  {
    name: 'Blueberry Summertime Drink',
    id: 8769123123,
    image_url:
      'https://www.godairyfree.org/wp-content/uploads/2006/05/Wild-Blue-Smoothie-online-feature2.jpg',
    notes: `This is my 2nd favorite smoothie. It's so good and it's so good for you. Really good stuff. Blueberries, yay.`,
    ingredients: [
      {
        name: 'Blueberry',
        id: 2348912,
        quantity: '1.5 oz',
      },
      {
        name: 'Ice',
        id: 984124,
        quantity: '7.4 cups',
      },
    ],
  },
  {
    name: 'Strawberry Banana Smoothie',
    id: 438501361,
    image_url:
      'https://deliciouslysprinkled.com/wp-content/uploads/2020/03/THE-BEST-STRAWBERRY-BANANA-SMOOTHIE.jpg',
    notes: `Strawberries and bananas were just meant for each other.  Their sweet flavors pair together perfectly in a smoothie.  And when blended up with a handful of ice and your choice of milk (dairy or plant-based), this strawberry banana smoothie is delightfully smooth and creamy and satisfying.  Feel free to also add any of your favorite smoothie boosters in too, such as fresh greens, seeds or protein powder.  Or you can also play around and jazz up the flavor with some fresh ginger or other fruits and veggies that you might like to add in too.`,
    ingredients: [
      {
        name: 'Strawberry',
        id: 924712,
        quantity: '1.5 oz',
      },
      {
        name: 'Ice',
        id: 129891,
        quantity: '5.2 cups',
      },
      {
        name: 'Banana',
        id: 190918,
        quantity: '3.2 lbs',
      },
    ],
  },
];

const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(smoothies[0]);
  // must revise to use custom hook with API eventually
  const [recipes, setRecipes] = useState(smoothies);

  const placeholderSearch = term => {
    // uses smoothies b/c it assumes you're pulling from db
    const new_smoothies = smoothies.filter(smoothie =>
      smoothie.name.toLowerCase().includes(term.toLowerCase())
    );
    setRecipes(new_smoothies);
  };

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
          <SearchBar onSearch={placeholderSearch} />
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
            onRecipeDelete={setSelectedRecipe}
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
