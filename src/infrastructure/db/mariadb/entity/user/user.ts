import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import BasketEntity from '../order/basket';
import LikeStoreEntity from './likeStore';
import UserAddressEntity from './userAddress';

@Entity({ name: 'user' })
export default class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: '120' })
  password: string;

  @Column({ type: 'varchar', length: '11' })
  name: string;

  @Column({ type: 'varchar', length: '50' })
  nickname: string;

  @Column({ type: 'varchar', length: '50', nullable: true })
  email: string;

  @Column({ type: 'varchar', length: '11' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  encryptedCI: string;

  @Column({ type: 'varchar', length: '300' })
  profileImageURL: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @OneToMany(() => BasketEntity, (basket) => basket.user, { onDelete: 'CASCADE', nullable: true })
  basket?: BasketEntity[];

  @OneToMany(() => UserAddressEntity, (address) => address.userId, { cascade: true })
  address?: UserAddressEntity[];

  @OneToMany(() => LikeStoreEntity, (likeStore) => likeStore.userId, { cascade: true })
  likeStoreId?: LikeStoreEntity[];
}
