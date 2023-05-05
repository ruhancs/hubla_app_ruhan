import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    description: "The product name, must be unique"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Transaction value"
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    description: "product producer name, must be registered in users"
  })
  @IsString()
  @IsNotEmpty()
  producerName: string;
}
