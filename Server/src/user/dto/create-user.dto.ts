import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
