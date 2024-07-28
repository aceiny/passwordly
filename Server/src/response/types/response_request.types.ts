import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  response_text: string;
}
