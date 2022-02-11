import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import VerificationEntity from '../auth/verification';
import BasketEntity from '../order/basket';
import SearchEntity from '../search/search';
import LikeStoreEntity from './likeStore';
import UserAddressEntity from './userAddress';

@Entity({ name: 'user' })
export default class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: '120' })
  password: string;

  @Column({ type: 'varchar', length: '50' })
  nickname: string;

  @Column({ type: 'varchar', length: '50', unique: true })
  @Index('idx_email')
  email: string;

  @Column({ type: 'varchar', length: '11' })
  @Index('idx_phone_number')
  phoneNumber: string;

  @Column({ type: 'char', length: 1, default: 'S', comment: 'K: kakao, F: facebook, G: google, S: standard' })
  type: string;

  @Column({ type: 'char', length: 1, default: 'U', comment: 'U: user, O: owner' })
  status: string;

  @Column({ type: 'varchar', length: '300', nullable: true })
  profileImageURL: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @OneToMany(() => BasketEntity, (basket) => basket.userId, { onDelete: 'CASCADE', nullable: true })
  basket?: BasketEntity[];

  @OneToMany(() => UserAddressEntity, (address) => address.userId, { cascade: true })
  address?: UserAddressEntity[];

  @OneToMany(() => LikeStoreEntity, (likeStore) => likeStore.userId, { cascade: true })
  likeStore?: LikeStoreEntity[];

  @OneToMany(() => SearchEntity, (search) => search.userId)
  search?: SearchEntity[];

  @OneToMany(() => VerificationEntity, (verification) => verification.userId)
  verification?: VerificationEntity[];
}
