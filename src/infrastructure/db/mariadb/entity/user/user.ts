import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import BasketEntity from '../order/basket';
import UserAddressEntity from './userAddress';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'user_test' : 'user';

@Entity({ name })
export default class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: '11' })
  phone_number: string;

  @Column({ type: 'varchar', length: '50' })
  nickname: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  encrypted_ci: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;

  @OneToMany(() => BasketEntity, (basket) => basket.user, { onDelete: 'CASCADE', nullable: true })
  basket?: BasketEntity[];

  @OneToMany(() => UserAddressEntity, (address) => address.user, { cascade: true })
  address?: UserAddressEntity[];
}
