import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import StoreEntity from '../store/store';
import UserEntity from '../user/user';

@Entity({ name: 'review' })
export default class ReviewEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  uuid: string;

  @Column({ type: 'tinyint' })
  grade: number;

  @Column({ type: 'varchar', length: 1000 })
  content: string;

  @Column({ type: 'char', length: 1 })
  visible: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => StoreEntity, (store) => store.id)
  @JoinColumn({ name: 'storeId' })
  storeId: number;
}
