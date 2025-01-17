import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
