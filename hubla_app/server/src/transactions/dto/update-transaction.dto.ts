// import { PartialType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/swagger";
import { CreateTransactionDto } from "./create-transaction.dto";

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
