import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
  @ApiProperty({
    description: "type of the transaction should be: 1:producer sale ,2:affiliate sale, 3:commission payment, 4:commission received"
  })
  @IsInt()
  @IsNotEmpty()
  type: number;

  @ApiProperty({
    description: "Transaction date"
  })
  @IsString()
  @IsNotEmpty()
  Date: string;

  @ApiProperty({
    description: "Product sale, the product must be registered in products"
  })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    description: "Transaction value"
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    description: "Name of the user who performed the transaction, the name must be registered in users"
  })
  @IsString()
  @IsNotEmpty()
  sellerName: string;
}
