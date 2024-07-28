import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class Wilaya {
  willaya_name: string;
  willaya_number: number;
  willaya_needs: number;
}
export enum surveyStatus {
  active = "active",
  inactive = "inactive",
}
export class createSurveyDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  target_audience: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsArray()
  wilaya: Wilaya[];

  @ApiProperty()
  @IsUUID()
  company: string;
}
export class createCourseDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  link_title: string;

  @IsNotEmpty()
  link_url: string;

  @IsNotEmpty()
  question_text: string;

  @IsNotEmpty()
  question_description: string;

  @IsNotEmpty()
  response_text: string;

  @IsNotEmpty()
  response_type: string;

  @IsNotEmpty()
  survey: string;
}
export class updateSurveyDto {
  @ApiProperty({ required: false })
  title: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty({ required: false })
  target_audience: string;
  @ApiProperty({ required: false })
  price: number;
  @ApiProperty({ required: false })
  wilaya: Wilaya[];
  @ApiProperty({ required: false })
  company: string;
}
export class updateSurveyStatus {
  @ApiProperty({ required: true })
  @IsEnum(surveyStatus)
  status: surveyStatus;
}
