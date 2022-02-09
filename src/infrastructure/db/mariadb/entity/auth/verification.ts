import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from '../user/user';

@Entity({ name: 'verification' })
export default class VerificationEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  @Index()
  verificationNumber: number;

  @Column({ type: 'varchar', length: 11 })
  phoneNumber: string;

  @Column({ type: 'char', length: 1, default: 'N' })
  status: string;

  @Column({ type: 'varchar', length: 9, comment: 'timestamp - second' })
  expirationTime: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: number;
}
