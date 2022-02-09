import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import BasketEntity from '../order/basket';
import StoreEntity from '../store/store';
import MenuCategoryEntity from './category';

@Entity({ name: 'menu' })
export default class MenuEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: '20' })
  name: string;

  @Column({ type: 'varchar', length: '20' })
  description: string;

  @Column({ type: 'int', width: 6 })
  price: number;

  @Column({ type: 'varchar', length: '150' })
  menu_image: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;

  @ManyToOne(() => StoreEntity, (store) => store.id, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @ManyToOne(() => MenuCategoryEntity, (category) => category.id, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: MenuCategoryEntity;

  @OneToMany(() => BasketEntity, (basket) => basket.menuId, { cascade: true })
  basket?: BasketEntity[];
}
