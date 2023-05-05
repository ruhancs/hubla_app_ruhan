import { makeAutoObservable } from 'mobx';

import requestApi from '../api/requestsToApi';
import { IProduct } from '../models/product';
import { IProductCreate } from '../models/productCreate';

export default class ProductStore {
  products: IProduct[] = [];
  //   productsRegistry = new Map<number, IProduct>();
  loadingInitial = false;
  productDto: IProductCreate = {
    name: '',
    value: 0,
    producerName: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  loadProducts = async () => {
    this.setLoadingInitial(true);
    try {
      const products = await requestApi.Products.list();
      products.forEach((product: IProduct) => {
        this.products.push(product);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  createProduct = async () => {
    this.setLoadingInitial(true);
    try {
      await requestApi.Products.create(this.productDto);
      this.loadProducts();
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // private setProduct = (product: IProduct) => {
  //   this.usersRegistry.set(product.id, product);
  // };
}
