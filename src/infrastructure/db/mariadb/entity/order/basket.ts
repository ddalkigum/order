import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import MenuEntity from '../menu/menu';
import StoreEntity from '../store/store';
import UserEntity from '../user/user';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'basket_test' : 'basket';

@Entity({ name })
export default class BasketEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  encrypted_ci: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;

  @ManyToOne(() => MenuEntity, (menu) => menu.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity;

  @ManyToOne(() => StoreEntity, (store) => store.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
