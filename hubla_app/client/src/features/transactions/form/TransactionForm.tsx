import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';

export default observer(function TransactionForm() {
  const { transactionStore } = useStore();
  const [file, setFile] = useState([]);
  const navigate = useNavigate();

  const fileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  function handleSubmit(event: any) {
    transactionStore
      .createTransctionsByFile(file)
      .then(() => navigate('/transactions'));
  }

  return (
    <Segment clearing>
      <Form
        data-testid="mock_id"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          id="file"
          onChange={fileChange}
          type="file"
          placeholder="Insert File text"
          accept="text/plain"
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
