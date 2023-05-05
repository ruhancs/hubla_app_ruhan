import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBadRequestResponse({description: "Bad request"})
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // @ApiNotFoundResponse({description: "Not found"})
  // @Post()
  // findByProductName(@Body() productName: string ) {
  //   return this.productService.findByProductName( productName )
  // }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiNotFoundResponse({description: "Not found"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
