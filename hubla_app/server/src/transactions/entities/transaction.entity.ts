import { Transaction } from "@prisma/client";

export class TransactionEntity implements Transaction {
  id: number;
  type: number;
  Date: string;
  product: string;
  value: number;
  sellerId: number;
  createdAt: Date;
}
