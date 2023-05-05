import { createContext, useContext } from 'react';

import CommonStore from './commonStore';
import ProductStore from './productStore';
import TransactionStore from './transactionStore';
import UserStore from './userStore';

interface Store {
  transactionStore: TransactionStore;
  commonStore: CommonStore;
  userStore: UserStore;
  productStore: ProductStore;
}

export const store: Store = {
  transactionStore: new TransactionStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  productStore: new ProductStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
