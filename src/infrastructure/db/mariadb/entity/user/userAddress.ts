import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './user';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'user_address_test' : 'user_address';

@Entity({ name })
export default class UserAddressEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'point', srid: 4326 })
  @Index('sx_user_location', { spatial: true })
  location: number[];

  @Column({ type: 'tinyint', default: 0 })
  main: number;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
