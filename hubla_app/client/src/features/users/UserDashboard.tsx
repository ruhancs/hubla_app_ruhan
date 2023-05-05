import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import LoadingComponent from '../../app/layout/loadingComponent';
import { useStore } from '../../app/stores/store';
import UserList from './UserList';

export default observer(function UsersDashboard() {
  const { userStore } = useStore();
  const { loadUsers, users } = userStore;

  useEffect(() => {
    if (users.length <= 1) loadUsers();
  }, [loadUsers, users]);

  if (userStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <UserList />
      </Grid.Column>
      <Grid.Column width="6">{/* <h2>filter</h2> */}</Grid.Column>
    </Grid>
  );
});
