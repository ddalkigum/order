import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import StoreEntity from '../store/store';
import UserEntity from './user';

@Entity({ name: 'like_store' })
export default class LikeStoreEntity {
  @PrimaryColumn({ type: 'varchar' })
  uuid: string;

  @Column({ type: 'char', length: 1 })
  isLiked: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storeId' })
  storeId: StoreEntity;
}
