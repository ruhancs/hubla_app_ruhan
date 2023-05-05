import { makeAutoObservable } from 'mobx';

import requestApi from '../api/requestsToApi';
import { IUser } from '../models/user';
import { IUserCreate } from '../models/userCreate';

export default class UserStore {
  users: IUser[] = [];
  usersRegistry = new Map<number, IUser>();
  loadingInitial = false;
  username: IUserCreate = {
    name: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  get allUsers() {
    return Array.from(this.usersRegistry.values());
  }

  loadUsers = async () => {
    this.setLoadingInitial(true);
    try {
      const users = await requestApi.Users.list();
      users.forEach((user: IUser) => {
        this.setUsers(user);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  private setUsers = (user: IUser) => {
    this.usersRegistry.set(user.id, user);
  };

  createUser = async (name: string) => {
    this.setLoadingInitial(true);
    this.username.name = name;
    try {
      await requestApi.Users.create(this.username);
      this.loadUsers();
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // private setUser = (user: IUser) => {
  //   this.usersRegistry.set(user.id, user);
  // };
}
