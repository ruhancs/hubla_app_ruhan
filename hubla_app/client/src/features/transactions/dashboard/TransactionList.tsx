import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';

export default observer(function TransactionList() {
  const { transactionStore } = useStore();
  const { deleteTransaction, transactionByDate } = transactionStore;

  return (
    <Segment data-testid="mock_id">
      <Item.Group divided>
        {transactionByDate.map((transaction) => (
          <Item key={transaction.id}>
            <Item.Content>
              <Item.Header as="a">{transaction.product}</Item.Header>
              <Item.Meta>{transaction.Date}</Item.Meta>
              <Item.Description>
                <div>SELLER: {transaction.seller.name}</div>
                <div>VALUE: {transaction.value}</div>
                {transaction.type === 1 && <div>type: producer sale</div>}
                {transaction.type === 2 && <div>type: affiliate sale</div>}
                {transaction.type === 3 && <div>type: commission payment</div>}
                {transaction.type === 4 && <div>type: commission receipt</div>}
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/transactions/${transaction.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteTransaction(transaction.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={`type code: ${transaction.type}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
