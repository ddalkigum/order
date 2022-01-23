import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'users_test' : 'users';

@Entity({ name })
export default class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: '11' })
  phone_number: string;

  @Column({ type: 'varchar', length: '50' })
  nickname: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  @Index('idx_encrypted_ci')
  encrypted_ci: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;
}
