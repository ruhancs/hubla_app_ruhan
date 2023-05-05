import { fakeProducts } from "./fakeProducts";

export const ProductRepositoryMock = {
    create: jest.fn().mockReturnValue(fakeProducts[0]),
    findAll: jest.fn().mockReturnValue(fakeProducts),
    remove: jest.fn(),
};