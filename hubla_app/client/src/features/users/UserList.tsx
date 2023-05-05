import { observer } from 'mobx-react-lite';
import { Item, Segment } from 'semantic-ui-react';

import { useStore } from '../../app/stores/store';

export default observer(function UserList() {
  const { userStore } = useStore();
  const { users } = userStore;

  return (
    <Segment>
      <Item.Group divided>
        {users.map((user) => (
          <Item key={user.id}>
            <Item.Content>
              <Item.Header as="a">{user.name}</Item.Header>
              <Item.Description>
                <div>BALANCE: {user.balance}</div>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
