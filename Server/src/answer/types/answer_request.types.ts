import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsUUID, ValidateNested } from "class-validator";
import { createResponseAnswerDto } from "src/response_answer/types/response_answer_request.types";

export class createAnswerDto {
  @IsUUID()
  @ApiProperty({ description: "survey that the collector is answering id" })
  survey: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => createResponseAnswerDto)
  @ApiProperty({ description: "array of all question in the survey responses" })
  response_answer: createResponseAnswerDto[];
}
