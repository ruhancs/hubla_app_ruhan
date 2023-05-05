import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { TransactionsRepository } from "./repositories/transactions.repository";
import { TransactionEntity } from "./entities/transaction.entity";
import { NotFoundError } from "../common/errors/types/NotFoundError";

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    ) {}
    
  create(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity> {
    return this.transactionsRepository.create(createTransactionDto);
  }

  findAll(): Promise<TransactionEntity[]> {
    return this.transactionsRepository.findAll();
  }

  async findOne(id: number): Promise<TransactionEntity> {
    const transaction = await this.transactionsRepository.findOne(id);

    if (!transaction) {
      throw new NotFoundError("transaction not found");
    }

    return transaction;
  }
  
  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction =await this.transactionsRepository.findOne(id);
    
    if (!transaction) {
      throw new NotFoundError("transaction not found");
    }
    
    return this.transactionsRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const transaction =await this.transactionsRepository.findOne(id);

    if (!transaction) {
      throw new NotFoundError("transaction not found");
    }

    return this.transactionsRepository.remove(id);
  }
}
