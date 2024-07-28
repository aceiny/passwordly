import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { Response } from "src/response/response.entity";

export class createResponseAnswerDto {
  @IsUUID()
  @ApiProperty({
    description: "question in the survey id",
  })
  question: string;
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: "that question response",
  })
  response?: string;
  answer: Answer;
  @ApiProperty({
    required: false,
    description: "answer text in case its a free",
  })
  answer_text?: string;
}
