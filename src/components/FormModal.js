import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AddRecipeForm from './AddRecipeForm';
import { generateUID } from '../helpers';
import { upload } from '../api/api';

const DEFAULT_IMAGE =
  'https://previews.123rf.com/images/jemastock/jemastock1903/jemastock190301516/118224415-fruit-smoothie-drink-white-drawing-on-black-background-vector-illustration-graphic-design.jpg';

const FormModal = ({
  show,
  hideModal,
  recipes,
  setRecipes,
  toEdit,
  setToEdit,
}) => {
  const [title, setTitle] = useState('Add Smoothie Recipe');
  const [recipeName, setRecipeName] = useState('Recipe 1');
  const [imgUrl, setImgUrl] = useState(
    'https://www.culturesforhealth.com/learn/wp-content/uploads/2016/04/Basic-Fruit-Smoothie-Recipe_header.jpg'
  );
  const [description, setDescription] = useState('love this!');
  const [ingredients, setIngredients] = useState(
    '1.5 lbs ice, 2.3 cups greens'
  );
  const setters = [setRecipeName, setImgUrl, setDescription, setIngredients];

  useEffect(() => {
    if (toEdit) {
      setTitle(`Edit ${toEdit.name} Recipe`);
      setRecipeName(toEdit.name);
      setImgUrl(toEdit.image_url);
      setDescription(toEdit.notes);
      setIngredients(
        toEdit.ingredients.map(ing => ing.measure + ' ' + ing.name).join(', ')
      );
    } else {
      setTitle('Add Smoothie Recipe');
    }
  }, [toEdit]);

  const exit = () => {
    setToEdit(null);
    setters.forEach(func => func(''));
    hideModal();
  };

  const validateIngredients = ingList => {
    return ingList.every(
      ing => ing.name && ing.measure && parseInt(ing.measure.split(' ')[0])
    );
  };

  const validateName = name => {
    return !recipes.some(rec => rec.name === name);
  };

  const onSubmit = e => {
    e.preventDefault();

    const ingList = ingredients.split(', ').map(str => {
      const ingSplit = str.split(' ');
      return {
        name: ingSplit[2],
        ingredient_id: generateUID(recipeName + '+' + ingSplit[2]),
        measure: ingSplit[0] + ' ' + ingSplit[1],
      };
    });

    if (!(toEdit || validateName(recipeName)) || !validateIngredients(ingList))
      return;

    if (toEdit) {
      const rec = recipes.find(recipe => recipe.recipe_id === toEdit.recipe_id);
      rec.name = recipeName;
      rec.image_url = imgUrl ? imgUrl : DEFAULT_IMAGE;
      rec.notes = description;
      rec.ingredients = ingList;

      upload(rec);
    } else {
      const id = generateUID(recipeName);

      const new_rec = {
        name: recipeName,
        recipe_id: id,
        image_url: imgUrl ? imgUrl : DEFAULT_IMAGE,
        notes: description,
        ingredients: ingList,
      };
      setRecipes([...recipes, ...[new_rec]]);
      upload(new_rec);
    }

    exit();
  };

  return (
    <Modal show={show} onHide={exit} size="lg" centered>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddRecipeForm
            recipe={recipeName}
            setRecipe={setRecipeName}
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
            desc={description}
            setDesc={setDescription}
            ing={ingredients}
            setIng={setIngredients}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={exit}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormModal;
