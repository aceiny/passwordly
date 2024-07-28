import { BaseEntity } from "src/abstract/base.entity";
import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { Response } from "src/response/response.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ResponseAnswer extends BaseEntity<ResponseAnswer> {
  @ManyToOne(() => Question)
  question: Question;
  @ManyToOne(() => Response, { nullable: true })
  response: Response;
  @ManyToOne(() => Answer)
  answer: Answer;
  @Column({
    nullable: true,
  })
  answer_text: string;
}
