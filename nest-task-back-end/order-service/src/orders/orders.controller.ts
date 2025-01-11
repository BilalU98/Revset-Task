import { Controller, Get, Post, Body, Delete, Param,  Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')  
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
 
  @Get()
  async getOrders() {
    return await this.ordersService.findAll();
  }


    @Post()
    async createOrder(@Body() order: CreateOrderDto) {
      return await this.ordersService.createOrder(order);
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.ordersService.findOne(id);
    }
  
    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() order: CreateOrderDto ) {
      return this.ordersService.updateOrder(id,order);
    }
  
    @Delete(':id')
    deleteOne(@Param('id') id: string,) {
      return this.ordersService.deleteOrder(id);
    }
}
