import { BaseEntity } from "src/abstract/base.entity";
import { Collector } from "src/collector/collector.entity";
import { ResponseAnswer } from "src/response_answer/response_answer.entity";
import { Survey } from "src/survey/survey.entity";
import { Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Answer extends BaseEntity<Answer> {
  @ManyToOne(() => Survey, (Survey) => Survey.answers)
  survey: Survey;
  @ManyToOne(() => Collector, (Collector) => Collector.answers)
  collector: Collector;
  @OneToMany(() => ResponseAnswer, (responseanswer) => responseanswer.answer)
  response_answer: ResponseAnswer;
}
