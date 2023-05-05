import { makeAutoObservable, runInAction, transaction } from 'mobx';

import requestApi from '../api/requestsToApi';
import { ITransaction } from '../models/transaction';

// central of states of the App
export default class TransactionStore {
  transactions: ITransaction[] = [];
  transactionRegistry = new Map<number, ITransaction>();
  selectedTransaction: ITransaction | undefined = undefined;
  form = false;
  loading = false;
  loadingInitial = false;
  constructor() {
    makeAutoObservable(this);
  }

  get transactionByDate() {
    return Array.from(this.transactionRegistry.values());
    // organize transactions by date
    // .sort((ta, tb) => Date.parse(ta.Date) - Date.parse(tb.Date))
    // .reverse();
  }

  loadTransactions = async () => {
    this.setLoadingInitial(true);
    try {
      const transactions = await requestApi.Transactions.list();
      transactions.forEach((transaction: ITransaction) => {
        this.setTransaction(transaction);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadTransaction = async (id: number) => {
    let transaction = this.getTransaction(id);
    if (transaction) this.selectedTransaction = transaction;
    else {
      this.setLoadingInitial(true);
      try {
        transaction = await requestApi.Transactions.details(id);
        this.setTransaction(transaction!);
        this.selectedTransaction = transaction;
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setTransaction = (transaction: ITransaction) => {
    transaction.Date = transaction.Date.split('T')[0];
    this.transactionRegistry.set(transaction.id, transaction);
  };

  private getTransaction = (id: number) => {
    return this.transactionRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createTransctionsByFile = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await requestApi.Transactions.createByFile(formData);
      runInAction(() => {
        this.loadTransactions();
        this.form = false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteTransaction = async (id: number) => {
    try {
      await requestApi.Transactions.delete(id);
      runInAction(() => {
        this.transactionRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
