import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Register Product entity with TypeORM
  controllers: [ProductsController],              // Register ProductsController
  providers: [ProductsService],                   // Register ProductsService as a provider
  exports: [ProductsService],                     // Export ProductsService for other modules to use
})
export class ProductsModule {}
