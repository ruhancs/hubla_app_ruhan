import { IUser } from './user';

export interface ITransaction {
  id: number;
  type: number;
  Date: string;
  product: string;
  value: number;
  sellerId: number;
  createdAt: string;
  seller: IUser;
}
