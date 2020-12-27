import { Exclude } from "class-transformer";
import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";


@Entity('purchase')
class Purchase {

  @ObjectIdColumn()
  @Exclude()
  id: ObjectID;

  @Column()
  transaction_id: string;


  @Column()
  provider_id: string;


  @Column({ default: 'avaliable' })
  status: 'avalieble' | 'canceled';

  @Column()
  price: number

  @Column()
  client_id: string;

  @Column()
  product: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;



}


export default Purchase;
