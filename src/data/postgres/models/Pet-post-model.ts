import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.model";

export enum petPostStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  ACTIVE = "active",
  INACTIVE = "inactive",
}


@Entity()
export class PetPost extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 60,
    nullable: false,
  })
  petName: string;

  @Column("text", {
    nullable: false,
  })
  description: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  image_url: string;

  @Column("enum", {
    enum: petPostStatus,
    default: petPostStatus.PENDING,
  })
  status: petPostStatus;

  @Column("boolean", {
    nullable: false,
    default: false,
  })
  hasFound: boolean;

  @Column("timestamp", {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;
  static status: string;

  @ManyToOne(() => User, (user) => user.petPosts)

  user: User;

}