import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import LoadingComponent from '../../../app/layout/loadingComponent';
import { useStore } from '../../../app/stores/store';
import ProductsList from './ProductsList';

export default observer(function ProductsDashboard() {
  const { productStore } = useStore();
  const { loadProducts, allProducts } = productStore;

  useEffect(() => {
    if (allProducts.length <= 1) loadProducts();
  }, [loadProducts, allProducts]);

  if (productStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ProductsList />
      </Grid.Column>
      <Grid.Column width="6">{/* <h2>filter</h2> */}</Grid.Column>
    </Grid>
  );
});
