import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import StoreEntity from './store';

const { NODE_ENV } = process.env;
const name = NODE_ENV === 'test' ? 'store_category_test' : 'store_category';

@Entity({ name })
export default class StoreCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: '20' })
  name: string;

  @Column({ type: 'varchar', length: '200' })
  icon: string;

  @OneToMany(() => StoreEntity, (store) => store.category, { nullable: true })
  store?: StoreEntity[];
}
