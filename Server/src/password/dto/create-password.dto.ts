import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  identifier: string;
  
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  
  @ApiProperty()
  @IsOptional()
  url: string;
}
