import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(product: CreateProductDto) {
    return this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await  this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product
  }

  async updateProduct(id: string, updateData: Partial<Product>) {
  const product =   await this.productRepository.update(id, updateData);
  if (!product.affected) {
    throw new NotFoundException('Product not found');
  }
     return { success: true };
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.delete(id);

    if (!product.affected) {
       throw new NotFoundException('Product not found');
    }

    return { success: true };
  }

  async decrementStock(productId: string, quantity: number) {
    const product = await this.productRepository.findOneBy({id:productId});
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.stock -= quantity;
    return this.productRepository.save(product);
  }
}
