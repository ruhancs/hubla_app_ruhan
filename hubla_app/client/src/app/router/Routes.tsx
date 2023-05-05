import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import ProductForm from '../../features/products/form/ProductForm';
import TransactionDashboard from '../../features/transactions/dashboard/TransactionDashboard';
import TransactionDetails from '../../features/transactions/details/TransactionDetails';
import TransactionForm from '../../features/transactions/form/TransactionForm';
import UserForm from '../../features/users/form/UserForm';
import UserDashboard from '../../features/users/UserDashboard';
import App from '../layout/App';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      // { path: '', element: <HomePage /> },
      { path: 'transactions', element: <TransactionDashboard /> },
      { path: 'transactions/:id', element: <TransactionDetails /> },
      { path: 'uploadfile', element: <TransactionForm /> },
      { path: 'users', element: <UserDashboard /> },
      { path: 'users/create', element: <UserForm /> },
      { path: 'products', element: <ProductDashboard /> },
      { path: 'products/create', element: <ProductForm /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'server-error', element: <ServerError /> },
      { path: '*', element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
