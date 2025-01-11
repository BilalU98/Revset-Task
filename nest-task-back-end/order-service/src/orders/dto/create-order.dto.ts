import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateOrderDto {
    
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  paymentMethod: string;

  @IsNotEmpty()
  shippingAddress: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  totalPrice: number;
}

