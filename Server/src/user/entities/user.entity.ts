import { BaseEntity } from "src/abstract/base.entity";
import { Password } from "src/password/entities/password.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity<User> {
  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Password, (password) => password.user)
  passwords: Password[];
}
