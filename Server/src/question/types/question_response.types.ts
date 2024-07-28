import { baseReturnType } from "src/abstract/base.types";
import { Question } from "../question.entity";

export class getQuestionReturnDto extends baseReturnType {
  questions: Question[];
}
export class createQuestionReturnDto extends baseReturnType {
  question: Question;
}
