import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class TransactionsRepository {
  constructor(private readonly dbContext: PrismaService) {}

  async create(
    createTransactionDto: CreateTransactionDto
  ): Promise<TransactionEntity> {
    const { sellerName } = createTransactionDto;

    delete createTransactionDto.sellerName;

    const user = await this.dbContext.user.findUnique({
      where: {
        name: sellerName,
      },
    });

    if (!user) {
      throw new NotFoundException("seller not found");
    }

    const data: Prisma.TransactionCreateInput = {
      ...createTransactionDto,
      seller: {
        connect: {
          name: sellerName,
        },
      },
    };

    return this.dbContext.transaction.create({
      data: data,
    });
  }

  async findAll(): Promise<TransactionEntity[]> {
    return this.dbContext.transaction.findMany({
      include: {
        seller: {
          select: {
            name: true,
            balance: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<TransactionEntity> {
    return this.dbContext.transaction.findUnique({
      where: {
        id,
      },
      include: {
        seller: {
          select: {
            name: true,
            balance: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto
  ): Promise<TransactionEntity> {
    return this.dbContext.transaction.update({
      where: {
        id,
      },
      data: updateTransactionDto,
    });
  }
  
  async updateUserBalance(name:string, value:number) {
    return await this.dbContext.user.update({
      where: {
        name: name,
      },
      data: {balance: value},
    });
     
  }

  async remove(id: number): Promise<TransactionEntity> {
    return this.dbContext.transaction.delete({
      where: {
        id,
      },
    });
  }

}
