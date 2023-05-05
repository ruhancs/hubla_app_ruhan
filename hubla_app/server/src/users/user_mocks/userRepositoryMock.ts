import { fakeUsers } from "./fakeUsers";

const users = fakeUsers 

export const UserRepositoryMock = {
    create: jest.fn().mockReturnValue(users[0]),
    findAll: jest.fn().mockReturnValue(users),
    findOne: jest.fn().mockReturnValue(users[0]),
    update: jest.fn().mockReturnValue(users[0]),
    remove: jest.fn(),
};