import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import ReviewEntity from './review';

@Entity({ name: 'review_image' })
export default class ReviewImageEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  uuid: string;

  @Column({ type: 'varchar', length: 300 })
  URL: string;

  @ManyToOne(() => ReviewEntity, (review) => review.uuid)
  @JoinColumn({ name: 'reviewId' })
  reviewId: number;
}
