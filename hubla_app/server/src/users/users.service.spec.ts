import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UsersRepository } from "./repositories/users.repository";
import {UserRepositoryMock} from './user_mocks/userRepositoryMock';
import { fakeUsers } from "./user_mocks/fakeUsers";
import { createUserDtoMock } from "./user_mocks/createUserDtoMock";

describe("UsersService", () => {
  let service: UsersService;
  let userRepository: UsersRepository;

  const userRepositoryMock = UserRepositoryMock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("service should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all users", async () => {
    const response = await service.findAll();

    expect(response).toEqual(fakeUsers);
  });

  it("should create one user", async () => {
    const response = await service.create(createUserDtoMock);

    expect(response).toEqual(fakeUsers[0]);
  });
});
