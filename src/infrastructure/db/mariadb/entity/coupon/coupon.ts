import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import StoreEntity from '../store/store';
import CouponUserEntity from './couponUser';

@Entity({ name: 'coupon' })
export default class CouponEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 120 })
  information: string;

  @Column({ type: 'varchar', length: 15 })
  ExpirationTime: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @Column({ type: 'char', length: 1, default: 'N' })
  isDeleted: string;

  @ManyToOne(() => StoreEntity, (store) => store.id, { cascade: true })
  @JoinColumn({ name: 'storeId' })
  storeId: number;

  @OneToMany(() => CouponUserEntity, (couponUser) => couponUser.couponId, { nullable: true })
  couponUser: CouponUserEntity[];
}
