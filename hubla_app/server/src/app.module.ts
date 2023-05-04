import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, TransactionsModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
