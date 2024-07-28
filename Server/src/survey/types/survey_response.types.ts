import { baseReturnType } from "src/abstract/base.types";
import { Survey } from "../survey.entity";

export class createSurveyReturnDto extends baseReturnType {
  survey: Survey;
}
