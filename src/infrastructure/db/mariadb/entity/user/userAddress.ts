import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './user';

@Entity({ name: 'user_address' })
export default class UserAddressEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  streetAddress: string;

  @Column({ type: 'point', srid: 4326 })
  @Index('sx_user_location', { spatial: true })
  location: number[];

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: UserEntity;
}
