import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'users_test' : 'users';

@Entity({ name })
export default class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: '11' })
  phone_number: string;

  @Column({ type: 'varchar', length: '50' })
  nick_name: string

  @Column({ type: 'varchar', length: 60, nullable: false })
  encrypted_ci: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;
};
