import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './repositories/products.repository';
import { ProductEntity } from './entities/product.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class ProductService {

  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    createProductDto.name = createProductDto.name.toUpperCase()
    createProductDto.producerName = createProductDto.producerName.toUpperCase()
    return this.productRepository.create(createProductDto);
  }

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.findAll()
  }

  async findByProductName(productName: string): Promise<ProductEntity> {
    const product = await this.productRepository.findByProductName(productName);

    if(!product){
      throw new NotFoundError("Product does not exist")
    }

    return product
  }

  remove(id: number) {
    return this.productRepository.remove(id);
  }
}
