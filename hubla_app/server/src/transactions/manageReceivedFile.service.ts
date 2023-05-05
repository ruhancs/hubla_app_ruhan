import { BadRequestException, Injectable } from "@nestjs/common";
import { TransactionsRepository } from "./repositories/transactions.repository";
import { NotFoundError } from "../common/errors/types/NotFoundError";
import { readFileSync } from "fs";
import { UsersRepository } from "../users/repositories/users.repository";
import { ProductRepository } from "../product/repositories/products.repository";

@Injectable()
export class ManageReceivedFileService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly userRepository: UsersRepository,
    private readonly productRepository: ProductRepository
    ) {}
    
    usersBalanceMap = new Map()
    operations = 0;
    async createTransactionByFile(filePath: string) {
      try {
        const data =  readFileSync(filePath, "utf8");
        const lines = data.split("\n");

        // time complexity is not the best but it was the solution found at the time
        lines.forEach(async (line) => {
          if(!line) {

          } else {
            this.operations += 1;
            await this.createTransactions(line)
          }
      })
      lines.forEach(async (line) => {
        const name = line.substring(66, 86).toUpperCase().trim()
        if(!line){

        } else {
          if(!this.usersBalanceMap.has(name)){
            this.usersBalanceMap.set(name,0)
          }
          await this.manageUsersBalance(line)
        }
      })  
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  
  private async createTransactions(line: any) {
    await this.transactionsRepository.create({
      type: +line[0],
      Date: line.substring(1, 26),
      product: line.substring(26, 56).trim(),
      value: +line.substring(56, 66),
      sellerName: line.substring(66, 86).toUpperCase().trim(),
    });
  }

  private async manageUsersBalance(line: any) {
      const type = +line[0];
      const product = line.substring(26, 56).trim();
      const value = +line.substring(56, 66);
      const sellerName = line.substring(66, 86).trim();
      switch (type) {
        case 1:
          this.saveUserBalanceInMemory(sellerName, value);
          break;
        case 2:
          await this.affiliateSale(product, value);
          break;
        case 3:
          this.operations -= 1;
          break;
        case 4:
          await this.commissionPayment(product, value, sellerName);
          break;
        default:
          break;
        }
      }

  private saveUserBalanceInMemory(name: string, value: number) {    
    this.updateMap(name,value)
    return
  }
  
  private updateMap (name:string, value:number) {
    const userBalance = this.usersBalanceMap.get(name)
    const newValue = userBalance + value
    this.usersBalanceMap.set(name,newValue)
    this.operations -= 1;
    if(this.operations === 0) {
      this.sendUserMapToUpdateBalance()
    }
  }

  private sendUserMapToUpdateBalance() {
    setTimeout(() => this.updateUsersBalance(this.usersBalanceMap),0)
    this.operations = 0;
  }

  private async affiliateSale(productName: string, value: number) {
    const product = await this.productRepository.findByProductName(productName)
    const producer = await this.userRepository.findOne(product.producerId)
    this.saveUserBalanceInMemory(producer.name, value);

    return;
  }
  
  private async commissionPayment(
    productName: string,
    value: number,
    sellerName: string
  ) {
    const product = await this.productRepository.findByProductName(productName)
    const producer = await this.userRepository.findOne(product.producerId)
    this.saveUserBalanceInMemory(producer.name, -value);
    this.saveUserBalanceInMemory(sellerName, value);
    return;
  }
  
  private updateUsersBalance  (usersBalanceMap:Map<any, any>) {
    this.operations = 0
    usersBalanceMap.forEach(async(value,name) => {
      const user = await this.checkUser(name)
      const finalBalance = user.balance + value
      await this.transactionsRepository.updateUserBalance(name,finalBalance)
      usersBalanceMap.delete(name)
    })
  }


  private async checkUser (name: string)  {
    const user = await this.userRepository.findByName(name.toUpperCase())

    if (!user) {
      throw new NotFoundError(`the name of user ${name} is not registered`);
    }
    return user;
  }
}
