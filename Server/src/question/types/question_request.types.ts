import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { createResponseDto } from "src/response/types/response_request.types";

export enum questionType {
  radio = "radio",
  checkbox = "checkbox",
  free = "free",
}

export class createQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  question_text: string;

  @ApiProperty()
  @IsNotEmpty()
  question_description: string;

  @ApiProperty()
  @IsEnum(questionType)
  question_type: questionType;

  @ApiProperty()
  @IsNotEmpty()
  max_mutiple_choice: number | null;

  @ApiProperty()
  @IsUUID()
  survey: string;

  @ApiProperty()
  @IsArray()
  responses: createResponseDto[];
}
