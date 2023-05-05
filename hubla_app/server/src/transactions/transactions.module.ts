import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { TransactionsRepository } from "./repositories/transactions.repository";
import { FileService } from "src/files/file.service";
import { UsersRepository } from "src/users/repositories/users.repository";
import { ProductRepository } from "src/product/repositories/products.repository";
import { ManageReceivedFileService } from "./manageReceivedFile.service";

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ManageReceivedFileService,
    PrismaService,
    TransactionsRepository,
    UsersRepository,
    ProductRepository,
    FileService,
  ],
})
export class TransactionsModule {}
