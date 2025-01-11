import {IsNotEmpty,IsString } from 'class-validator';

export class CreateProductDto {
    
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;



  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  stock: number;
}

