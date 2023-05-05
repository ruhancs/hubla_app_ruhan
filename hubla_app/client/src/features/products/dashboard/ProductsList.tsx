import { observer } from 'mobx-react-lite';
import { Item, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';

export default observer(function UserList() {
  const { productStore } = useStore();
  const { allProducts } = productStore;

  return (
    <Segment>
      <Item.Group divided>
        {allProducts.map((product) => (
          <Item key={product.id}>
            <Item.Content>
              <Item.Header as="a">{product.name}</Item.Header>
              <Item.Description>
                <div>VALUE: {product.value}</div>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
