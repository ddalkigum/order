import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import CategoryEntity from './categories';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'restaurants_test' : 'restaurants';

@Entity({ name })
@Index(['address', 'name'])
export default class RestaurantEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  longitude: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  sub_address: string;

  @OneToMany(() => CategoryEntity, (category) => category.restaurant)
  category: CategoryEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;
}
