import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsService } from "./transactions.service";
import { TransactionsRepository } from "./repositories/transactions.repository";
import { fakeTransactions } from "./transaction_mocks/fakeTransactions";
import { transactionRepositoryMock } from "./transaction_mocks/transactionRepositoryMock";
import { createTransactionDtoMock } from "./transaction_mocks/createTransactionDtoMock";

describe("TransactionsService", () => {
  let service: TransactionsService;
  let transactionRepository: TransactionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: TransactionsRepository,
          useValue: transactionRepositoryMock,
        }
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    transactionRepository = module.get<TransactionsRepository>(
      TransactionsRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all transactions", async () => {
    const response = await service.findAll();

    expect(response).toEqual(fakeTransactions);
  });

  it("should return one transaction", async () => {
    const response = await service.findOne(1);

    expect(response).toEqual(fakeTransactions[0]);
  });

  it("should create one transaction", async () => {
    const response = await service.create(createTransactionDtoMock);

    expect(response).toEqual(fakeTransactions[0]);
  });
  
});
