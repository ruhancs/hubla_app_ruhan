import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';

export default observer(function ProductForm() {
  const { productStore } = useStore();
  const navigate = useNavigate();

  function handleInput(event: any) {
    if (event.target.name === 'productName') {
      productStore.productDto.name = event.target.value;
    }
    if (event.target.name === 'value') {
      productStore.productDto.value = +event.target.value;
    }
    if (event.target.name === 'producerName') {
      productStore.productDto.producerName = event.target.value;
    }
  }

  function handleSubmit(event: any) {
    productStore.createProduct().then(() => navigate('/products'));
  }

  return (
    <Segment clearing>
      <Form data-testid="mock_id" onSubmit={handleSubmit}>
        <input
          id="text"
          name="productName"
          type="text"
          placeholder="Insert the product name"
          onChange={handleInput}
        />
        <input
          id="text"
          name="value"
          type="number"
          placeholder="Insert the product value"
          onChange={handleInput}
        />
        <input
          id="text"
          name="producerName"
          type="text"
          placeholder="Insert the producer name"
          onChange={handleInput}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          as={Link}
          to="/"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
