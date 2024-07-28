import { ApiProperty } from "@nestjs/swagger";
import {
  IS_DATE,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
} from "class-validator";

export class signupCollectorDto {
  @ApiProperty()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: "2004-07-06" })
  @IsDateString()
  birth_date: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber("DZ")
  phone_number: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  receiving_emails: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  agreed_to_terms: boolean;
}

export class signinCollectorDto {
  @ApiProperty()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
