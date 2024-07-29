import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  
  @IsStrongPassword()
  @ApiProperty()
  password: string;
}