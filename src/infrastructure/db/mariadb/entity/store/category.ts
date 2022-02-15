import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import StoreEntity from './store';

@Entity({ name: 'store_category' })
export default class StoreCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: '20' })
  name: string;

  @Column({ type: 'varchar', length: '200' })
  icon: string;

  @OneToMany(() => StoreEntity, (store) => store.categoryId, { nullable: true })
  store?: StoreEntity[];
}
