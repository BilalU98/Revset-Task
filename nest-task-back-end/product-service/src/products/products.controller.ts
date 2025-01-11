import { Controller, Get, Post, Param, Body, Delete, Patch, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @MessagePattern({ cmd: 'get-product' })
  async getProduct(productId: string) {
    return this.productsService.findOne(productId);
  }

  @MessagePattern({ cmd: 'decrement-stock' })
  async decrementStock(data: { productId: string; quantity: number }) {
    return this.productsService.decrementStock(data.productId, data.quantity);
  }

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() product: CreateProductDto) {
    return this.productsService.updateProduct(id,product);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string,) {
    return this.productsService.deleteProduct(id);
  }
}
