import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;  // Store the product ID
  
  @Column('int')
  quantity: number;

  @Column('decimal')
  totalPrice: number;
  
  @Column({
    type: 'enum',
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  })
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

  @CreateDateColumn()
  orderDate: Date;

  @Column({ nullable: true })
  deliveryDate: Date;

  @Column()
  paymentMethod: string;

  @Column()
  shippingAddress: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
