import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const AddRecipeForm = props => {
  return (
    <React.Fragment>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control
            required
            placeholder="Enter recipe name"
            value={props.recipe}
            onChange={e => props.setRecipe(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            placeholder="e.g. image.com/smooth_smoothie.jpg"
            value={props.imgUrl}
            onChange={e => props.setImgUrl(e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          as="textarea"
          placeholder="This smoothie is..."
          rows={3}
          value={props.desc}
          onChange={e => props.setDesc(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Ingredients:</Form.Label>
        <Form.Control
          required
          placeholder="e.g. 1.5 oz lemon, 0.3 lbs ice, ..."
          value={props.ing}
          onChange={e => props.setIng(e.target.value)}
        />
      </Form.Group>
    </React.Fragment>
  );
};

export default AddRecipeForm;
