import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import MenuEntity from './menu';

@Entity({ name: 'menu_category' })
export default class MenuCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: '20' })
  name: string;

  @Column({ type: 'varchar', length: '200' })
  icon: string;

  @OneToMany(() => MenuEntity, (menu) => menu.category, { onDelete: 'CASCADE' })
  menu?: MenuEntity[];
}
