import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import BasketEntity from './basket';

@Entity({ name: 'order' })
export default class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  storeRequestContext: string;

  @Column({ type: 'varchar', length: 100 })
  riderRequestContext: string;

  @Column({ type: 'varchar', length: '1' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @ManyToOne(() => BasketEntity, (basket) => basket.id, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'basketId' })
  basketId: BasketEntity;
}
