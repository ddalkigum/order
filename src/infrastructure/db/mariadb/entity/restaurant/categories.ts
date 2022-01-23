import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import RestaurantEntity from './restaurants';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'restaurants_test' : 'restaurants';

@Entity({ name })
export default class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.id)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant?: RestaurantEntity[];
}
