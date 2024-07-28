import { BaseEntity } from "src/abstract/base.entity";
import { baseRoles } from "src/abstract/base.types";
import { Answer } from "src/answer/answer.entity";
import { Entity, Column, OneToMany } from "typeorm";

@Entity()
export class Collector extends BaseEntity<Collector> {
  @Column()
  email: string;
  @Column()
  phone_number: string;
  @Column()
  password: string;
  @Column({
    default: baseRoles.collector,
  })
  role: string;
  @OneToMany(() => Answer, (Answer) => Answer.collector)
  answers: Answer[];
}
