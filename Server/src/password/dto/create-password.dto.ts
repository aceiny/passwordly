import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePasswordDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  identifier: string;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  url: string;
}
