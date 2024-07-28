import { BaseEntity } from "src/abstract/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Password extends BaseEntity<Password> {
  @Column()
  name: string;
  @Column({
    nullable: true,
  })
  url: string;
  @Column({
    default: "https://i.sstatic.net/3hRmg.png",
  })
  icon: string;
  @Column()
  identifier: string;
  @Column()
  password: string;
  @ManyToOne(() => User, (user) => user.passwords)
  user: User;
}
