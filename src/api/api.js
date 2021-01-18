import axios from 'axios';
import * as cloneDeep from 'lodash/cloneDeep';

export const get = async term => {
  const response = await axios.get(
    `https://smoothies-backend.herokuapp.com/recipe/?search=${term}`
  );

  return response.data.recipes;
};

export const deleteFromDB = async id => {
  const response = await axios.delete(
    `https://smoothies-backend.herokuapp.com/recipe/?recipe_id=${id}`
  );

  return response;
};

export const upload = async recipe => {
  // quick-fix rename some properties for api call
  const rec = cloneDeep(recipe);
  rec['id'] = rec['recipe_id'];
  delete rec['recipe_id'];
  rec['ingredients'].forEach(ing => {
    ing['id'] = ing['ingredient_id'];
    ing['quantity'] = ing['measure'];
    delete ing['ingredient_id'];
    delete ing['measure'];
  });

  const response = await axios.put(
    `https://smoothies-backend.herokuapp.com/recipe/`,
    rec
  );

  return response;
};
