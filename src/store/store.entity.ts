import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Store extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column({ length: 512, unique: true })
  address: string;

  @Column()
  x: number;

  @Column()
  y: number;

}
