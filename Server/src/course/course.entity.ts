import { BaseEntity } from "src/abstract/base.entity";
import { Survey } from "src/survey/survey.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity()
export class Course extends BaseEntity<Course> {
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  link_title: string;
  @Column()
  link_url: string;
  @Column()
  question_text: string;
  @Column()
  question_description: string;
  @Column() // this need to be worked on more
  response_text: string;
  @Column()
  response_type: string;
  @OneToOne(() => Survey, (survey) => survey.course)
  survey: Survey;
}
