import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
} from "class-validator";

export class adminSignupDto {
  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @ApiProperty({ example: "Yacine Zeraibi" })
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsPhoneNumber("DZ")
  phone_number: string;

  @ApiProperty({ example: "yzeraibi2000@gmail.com " })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "YaAxIne985@@" })
  @IsStrongPassword()
  password: string;
}
export class adminSigninDto {
  @ApiProperty({ example: "yzeraibi2000@gmail.com " })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "YaAxIne985@@" })
  @IsNotEmpty()
  password: string;
}
export class adminUpdateDto {}
