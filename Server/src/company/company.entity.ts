import { BaseEntity } from "src/abstract/base.entity";
import { baseRoles } from "src/abstract/base.types";
import { Survey } from "src/survey/survey.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Company extends BaseEntity<Company> {
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Survey, (survey) => survey.company)
  surveys: Survey[];
  @Column({
    default: baseRoles.company,
  })
  role: string;
}
