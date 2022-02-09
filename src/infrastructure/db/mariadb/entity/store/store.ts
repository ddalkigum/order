import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import MenuEntity from '../menu/menu';
import BasketEntity from '../order/basket';
import UserEntity from '../user/user';
import StoreCategoryEntity from './category';

@Entity({ name: 'store' })
export default class StoreEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

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

  @Column({ type: 'point', srid: 4326 })
  @Index('sx_store_location', { spatial: true })
  location: ArrayBuffer;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;

  @ManyToOne(() => StoreCategoryEntity, (category) => category.id, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'categoryId' })
  categoryId: number;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'ownerId' })
  userId: number;

  @OneToMany(() => BasketEntity, (basket) => basket.storeId, { cascade: true, nullable: true })
  basket?: BasketEntity[];

  @OneToMany(() => MenuEntity, (menu) => menu.store, { cascade: true, nullable: true })
  menu?: MenuEntity[];
}
