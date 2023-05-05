import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UsersRepository {
  constructor(private readonly dbContext: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.dbContext.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.dbContext.user.findMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.dbContext.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name: string) {
    return this.dbContext.user.findUnique({
      where: {
        name: name,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.dbContext.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async updateByName(name: string, updateUserDto: UpdateUserDto) {
    await this.dbContext.user.update({
      where: {
        name,
      },
      data: updateUserDto,
    });

    return;
  }

  async updateUserBalance(name:string, value:number) {
    return await this.dbContext.user.update({
      where: {
        name: name,
      },
      data: {balance: value},
    });
     
  }

  async remove(id: number): Promise<UserEntity> {
    return this.dbContext.user.delete({
      where: {
        id,
      },
    });
  }
}
