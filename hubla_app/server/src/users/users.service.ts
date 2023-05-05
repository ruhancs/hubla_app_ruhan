import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./repositories/users.repository";
import { UserEntity } from "./entities/user.entity";
import { NotFoundError } from "../common/errors/types/NotFoundError";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    if (createUserDto.balance !== 0) {
      throw new BadRequestException();
    }

    createUserDto.name = createUserDto.name.toUpperCase();

    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async findByName(name: string): Promise<UserEntity> {
    const user = await this.usersRepository.findByName(name.toUpperCase());

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.usersRepository.remove(id);
  }
}
