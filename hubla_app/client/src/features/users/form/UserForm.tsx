import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';

export default observer(function UserForm() {
  const { userStore } = useStore();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function handleInput(event: any) {
    setUsername(event.target.value);
  }

  function handleSubmit(event: any) {
    userStore.createUser(username).then(() => navigate('/users'));
  }

  return (
    <Segment clearing>
      <Form data-testid="mock_id" onSubmit={handleSubmit}>
        <input
          id="text"
          name="username"
          type="text"
          placeholder="Insert a Username"
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
