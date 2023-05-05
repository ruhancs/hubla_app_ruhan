import { observer } from 'mobx-react-lite';
import { Item, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';

export default observer(function UserList() {
  const { productStore } = useStore();
  const { products } = productStore;

  return (
    <Segment>
      <Item.Group divided>
        {products.map((product) => (
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
