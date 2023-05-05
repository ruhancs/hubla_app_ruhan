import { fakeTransactions } from "./fakeTransactions";

export const transactionRepositoryMock = {
    create: jest.fn().mockReturnValue(fakeTransactions[0]),
    findAll: jest.fn().mockReturnValue(fakeTransactions),
    findOne: jest.fn().mockReturnValue(fakeTransactions[0]),
    update: jest.fn().mockReturnValue(fakeTransactions[0]),
    findUser: jest.fn().mockReturnValue(fakeTransactions[0].seller),
    remove: jest.fn(),
    updateUserBalance: jest.fn().mockReturnValue(1000),
  };