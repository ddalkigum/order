import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import UserEntity from '../user/user';
import CouponEntity from './coupon';

@Entity({ name: 'coupon_user' })
export default class CouponUserEntity {
  @PrimaryColumn({ type: 'varchar' })
  uuid: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user, { cascade: true })
  @JoinColumn({ name: 'userId' })
  userId: UserEntity;

  @ManyToOne(() => CouponEntity, (coupon) => coupon, { cascade: true })
  @JoinColumn({ name: 'couponId' })
  couponId: CouponEntity;
}
