import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { IProduct } from '../models/product';
import { IProductCreate } from '../models/productCreate';
import { ITransaction } from '../models/transaction';
import { IUser } from '../models/user';
import { IUserCreate } from '../models/userCreate';
import { router } from '../router/Routes';
import { store } from '../stores/store';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.response.use(
  async (res) => {
    await sleep(100);
    return res;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        // eslint-disable-next-line no-prototype-builtins
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          router.navigate('/not-found');
        }
        if (data.errors) {
          const validationErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              validationErrors.push(data.errors[key]);
            }
          }
          throw validationErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error('unauthorised');
        break;
      case 403:
        toast.error('forbidden');
        break;
      case 404:
        toast.error(data.message);
        break;
      case 409:
        toast.error(`${data.message}`);
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate('/server-error');
        break;
    }
    return Promise.reject(error);
  },
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  // eslint-disable-next-line @typescript-eslint/ban-types
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  // put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Transactions = {
  list: () => requests.get<ITransaction[]>('/transactions'),
  details: (id: number) => requests.get<ITransaction>(`/transactions/${id}`),
  create: (transaction: ITransaction) =>
    requests.post<void>('/transactions', transaction),
  createByFile: (file: any) =>
    requests.post<void>('/transactions/upload', file),
  // update: (transaction:ITransaction) => requests.put<void>(`/transactions/${transaction.id}`, transaction),
  delete: (id: number) => requests.del<void>(`/transactions/${id}`),
};

const Users = {
  list: () => requests.get<IUser[]>('/users'),
  create: (username: IUserCreate) => requests.post<IUser>('/users', username),
};

const Products = {
  list: () => requests.get<IProduct[]>('/product'),
  create: (productDto: IProductCreate) =>
    requests.post<IProduct>('/product', productDto),
};

const requestApi = {
  Transactions,
  Users,
  Products,
};

export default requestApi;
