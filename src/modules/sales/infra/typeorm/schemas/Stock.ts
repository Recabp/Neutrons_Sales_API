import { Exclude } from 'class-transformer';
import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('stock')
class Stock {
  @ObjectIdColumn()
  @Exclude()
  id: ObjectID;

  @Column()
  provider_id: string;

  @Column()
  product: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Stock;
