import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import MenuEntity from '../menu/menu';
import BasketEntity from '../order/basket';
import OwnerEntity from '../user/owner';
import StoreCategoryEntity from './category';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'store_test' : 'store';

@Entity({ name })
export default class StoreEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 11 })
  store_phone_number: string;

  @Column({ type: 'tinyint', default: 0 })
  package_available: number;

  @Column({ type: 'int', width: 6 })
  min_order_price: number;

  @Column({ type: 'varchar', length: 50 })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;

  @ManyToOne(() => StoreCategoryEntity, (category) => category.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: StoreCategoryEntity;

  @ManyToOne(() => OwnerEntity, (owner) => owner.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: OwnerEntity;

  @OneToMany(() => BasketEntity, (basket) => basket.store, { cascade: true, nullable: true })
  basket?: BasketEntity[];

  @OneToMany(() => MenuEntity, (menu) => menu.store, { cascade: true, nullable: true })
  menu?: MenuEntity[];
}
