import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { TransactionsRepository } from "./repositories/transactions.repository";
import { fakeTransactions } from "./transaction_mocks/fakeTransactions";
import { transactionRepositoryMock } from "./transaction_mocks/transactionRepositoryMock";
import { FileService } from "../files/file.service";
import { ManageReceivedFileService } from "./manageReceivedFile.service";
import { UsersRepository } from "../users/repositories/users.repository"
import { UserRepositoryMock } from "../users/user_mocks/userRepositoryMock";
import { ProductRepository } from "../product/repositories/products.repository";
import { ProductRepositoryMock } from "../product/product_mocks/productRepositoryMock";
import { createTransactionDtoMock } from "./transaction_mocks/createTransactionDtoMock";

describe("TransactionsController", () => {
  let transactionController: TransactionsController;
  let transactionService: TransactionsService;
  let fileService: FileService;
  let transactionRepository: TransactionsRepository;
  let manageReceiptFile: ManageReceivedFileService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        { provide: TransactionsRepository, useValue: transactionRepositoryMock },
        FileService,
        ManageReceivedFileService,
        {provide: TransactionsRepository, useValue: transactionRepositoryMock},
        {provide: UsersRepository, useValue: UserRepositoryMock},
        {provide: ProductRepository, useValue: ProductRepositoryMock},

      ],
    }).compile();

    transactionController = module.get<TransactionsController>(TransactionsController);
    transactionService = module.get<TransactionsService>(TransactionsService);
    fileService = module.get<FileService>(FileService);
    manageReceiptFile = module.get<ManageReceivedFileService>(ManageReceivedFileService)
  });

  it("should be defined", () => {
    expect(transactionController).toBeDefined();
  });

  it("Should return all transactions",async () => {
    const response = await transactionController.findAll();

    expect(response).toEqual(fakeTransactions)
  })

  it("Should return one transaction",async () => {
    const response = await transactionController.findOne("1");

    expect(response).toEqual(fakeTransactions[0])
  })

  it("Should return the created transaction",async () => {
    const response = await transactionController.create(createTransactionDtoMock)

    expect(response).toEqual(fakeTransactions[0])
  })

});
