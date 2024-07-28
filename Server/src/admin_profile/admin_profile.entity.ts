import { BaseEntity } from "src/abstract/base.entity";
import { Admin } from "src/admin/admin.entity";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class AdminProfile extends BaseEntity<AdminProfile> {
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @OneToOne(() => Admin, { onDelete: "CASCADE" })
  @JoinColumn()
  admin: Admin;
}
