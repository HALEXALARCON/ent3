import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PetPost } from "./Pet-post-model";
import { Exclude } from "class-transformer";


export enum userRole {
  USER = "user",
  ADMIN = "admin"
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 150,
  })
  name: string;

  @Column("varchar", {
    length: 150,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  @Exclude()
  password: string;

  @Column("enum", {
    enum: userRole,
    default: userRole.USER,
  })
  rol: userRole;

  @Column("boolean", {
    nullable: false,
    default: true,
  })
  status: boolean;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;


  @OneToMany(() => PetPost, (petPost) => petPost.user)

  petPosts: PetPost[];
}
