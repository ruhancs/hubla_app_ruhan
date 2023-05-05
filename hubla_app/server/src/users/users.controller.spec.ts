import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { fakeUsers } from "./user_mocks/fakeUsers";
import { UserRepositoryMock } from "./user_mocks/userRepositoryMock";
import { UsersRepository } from "./repositories/users.repository";

describe("UsersController", () => {
  let userController: UsersController;
  let userService: UsersService;

  let userRepository: UsersRepository;

  const users = fakeUsers;

  const userRepositoryMock = UserRepositoryMock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should create a user', async() => {
    const result = await userController.create(users[0])

    expect(result).toEqual(users[0])
  })
  
  it('should return all users', async() => {
    const result = await userController.findAll()

    expect(result).toEqual(users)
  })

});
