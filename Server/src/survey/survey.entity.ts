import exp from "constants";
import { BaseEntity } from "src/abstract/base.entity";
import { Admin } from "src/admin/admin.entity";
import { Company } from "src/company/company.entity";
import { Course } from "src/course/course.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { surveyStatus } from "./types/survey_request.types";
import { Question } from "src/question/question.entity";
import { Answer } from "src/answer/answer.entity";

interface Wilaya {
  willaya_name: string;
  willaya_number: number;
  willaya_price: number;
  willaya_needs: number;
}

@Entity()
export class Survey extends BaseEntity<Survey> {
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  target_audience: string;
  @Column({ type: "jsonb" })
  wilaya: Wilaya[];
  @ManyToOne(() => Company, (Company) => Company.surveys)
  company: Company;
  @Column({
    type: "enum",
    enum: surveyStatus,
    default: surveyStatus.active,
  })
  status: surveyStatus;
  @OneToOne(() => Course, (course) => course.survey)
  @JoinColumn()
  course: Course;
  @ManyToOne(() => Admin)
  admin: Admin;
  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];
  @OneToMany(() => Answer, (answer) => answer.survey)
  answers: Answer[];
}
