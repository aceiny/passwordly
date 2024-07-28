import { BaseEntity } from "src/abstract/base.entity";
import { Question } from "src/question/question.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Response extends BaseEntity<Response> {
  @ManyToOne(() => Question, (question) => question.responses)
  question: Question;
  @Column({
    nullable: true,
  })
  response_text: string;
}
