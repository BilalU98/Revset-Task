import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';  // Used to get the first value from the observable
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy,  // Inject product service client
  ) {}

  async createOrder(order: CreateOrderDto) {
    // Send request to the Product Service to get the product details
    const product = await firstValueFrom(
      this.productServiceClient.send({ cmd: 'get-product' }, order.productId) // Send message to get product
    );


    if (!product) {
      throw new NotFoundException('Product not found. Please check the product ID.');
    }

   // Check if there is enough stock for the order
      if (product.stock < order.quantity) {
        throw new BadRequestException('Insufficient stock. Please reduce the quantity.');
      }


    const totalPrice = product.price * order.quantity;
    const newOrder = this.orderRepository.create({ ...order, totalPrice });
    const savedOrder = await this.orderRepository.save(newOrder);

    // Emit event to decrement stock in Product Service
    await this.productServiceClient
      .emit({ cmd: 'decrement-stock' }, { productId: order.productId, quantity: order.quantity })
      .toPromise();  // Emit doesn't need response

    return savedOrder;
  }

  async findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({ where: { id: id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  
  }

  // Method to update order status
  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status as 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    return this.orderRepository.save(order);
  }

  async updateOrder(id: string, updateData: Partial<Order>) {
    const order = await this.orderRepository.update(id, updateData);

    if (!order.affected) {
      throw new NotFoundException('Order not found');
    }
    return { success: true };
  }

  async deleteOrder(id: string) {
    const order = await this.orderRepository.delete(id);
    

    if (!order.affected) {
      throw new NotFoundException('Order not found');
    }

    return { success: true };
  }

}
