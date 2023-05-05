import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import LoadingComponent from '../../../app/layout/loadingComponent';
import { useStore } from '../../../app/stores/store';
import TransactionList from './TransactionList';

export default observer(function TransactionDashboard() {
  const { transactionStore } = useStore();
  const { loadTransactions, transactionRegistry } = transactionStore;

  useEffect(() => {
    if (transactionRegistry.size <= 1) loadTransactions();
  }, [loadTransactions, transactionRegistry]);

  if (transactionStore.loadingInitial)
    return <LoadingComponent data-testid="id_mock" content="Loading app" />;

  return (
    <Grid data-testid="id_mock">
      <Grid.Column width="10">
        <TransactionList />
      </Grid.Column>
      <Grid.Column width="6">{/* <h2>filter</h2> */}</Grid.Column>
    </Grid>
  );
});
