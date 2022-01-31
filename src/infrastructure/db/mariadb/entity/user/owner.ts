import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import StoreEntity from '../store/store';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'owner_test' : 'owner';

@Entity({ name })
export default class OwnerEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: '50' })
  name: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  encrypted_ci: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;

  @OneToMany(() => StoreEntity, (store) => store.owner, { cascade: true, nullable: true })
  store?: StoreEntity[];
}
