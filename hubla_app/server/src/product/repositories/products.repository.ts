import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductEntity } from "../entities/product.entity";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductRepository{
  constructor(private readonly dbContext: PrismaService) {}

  async create(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const { producerName } = createProductDto;

    delete createProductDto.producerName;

    const producer = await this.dbContext.user.findUnique({
      where: {
        name: producerName,
      },
    });

    if (!producer) {
      throw new NotFoundException("producer not found");
    }

    const data: Prisma.ProductCreateInput = {
      ...createProductDto,
      producer: {
        connect: {
          name: producerName,
        },
      },
    };

    return this.dbContext.product.create({
      data: data,
    });
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.dbContext.product.findMany();
  }

  async findByProductName(productName: string): Promise<ProductEntity> {
    return  await this.dbContext.product.findUnique({
      where: {
        name: productName
      }
    });
  }

  async remove(id: number): Promise<ProductEntity> {
    return this.dbContext.product.delete({
      where: {
        id,
      },
    });
  }

}