import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import BasketEntity from './basket';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'order_test' : 'order';

@Entity({ name })
export default class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  requestForOwner: string;

  @Column({ type: 'varchar', length: 100 })
  requestForRider: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;

  @ManyToOne(() => BasketEntity, (basket) => basket.id, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'basket_id' })
  basket: BasketEntity;
}
