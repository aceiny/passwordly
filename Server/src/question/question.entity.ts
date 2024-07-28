import exp from "constants";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { questionType } from "./types/question_request.types";
import { Survey } from "src/survey/survey.entity";
import { BaseEntity } from "src/abstract/base.entity";
import { Response } from "src/response/response.entity";

@Entity()
export class Question extends BaseEntity<Question> {
  @Column()
  question_text: string;
  @Column()
  question_description: string;
  @Column({
    type: "enum",
    enum: questionType,
    default: questionType.radio,
  })
  question_type: questionType;
  @Column({
    nullable: true,
    default: null,
  })
  max_mutiple_choice: number | null;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey;
  @OneToMany(() => Response, (response) => response.question, {
    onDelete: "CASCADE",
  })
  responses: Response[];
}
