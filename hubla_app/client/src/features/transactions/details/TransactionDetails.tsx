import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';

import LoadingComponent from '../../../app/layout/loadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function TransactionDetails() {
  const { transactionStore } = useStore();
  const {
    selectedTransaction: transaction,
    loadTransaction,
    loadingInitial,
  } = transactionStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadTransaction(+id);
  }, [id, loadTransaction]);

  if (loadingInitial || !transaction) return <LoadingComponent />;

  return (
    <Card fluid>
      {/* <Image src="" /> */}
      <Card.Content>
        <Card.Header>{transaction.product}</Card.Header>
        <Card.Meta>
          <span>transaction date: {transaction.Date}</span>
        </Card.Meta>
        <Card.Description>
          {transaction.seller.name} transaction worth of {transaction.value}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="1">
          {/* <Button basic color="blue" content="Edit" /> */}
          <Button
            as={Link}
            to="/transactions"
            basic
            color="red"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
