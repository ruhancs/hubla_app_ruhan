import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Name of the producer or affiliate should be unique"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "balance to create an user should be 0",
    default: 0
  })
  @IsNumber()
  balance = 0;
}
