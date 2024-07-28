import { BaseEntity } from "src/abstract/base.entity";
import { baseRoles } from "src/abstract/base.types";
import { Column, Entity } from "typeorm";

@Entity()
export class Admin extends BaseEntity<Admin> {
  @Column()
  username: string;
  @Column()
  phone_number: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({
    default: baseRoles.admin,
  })
  role: string;
}
