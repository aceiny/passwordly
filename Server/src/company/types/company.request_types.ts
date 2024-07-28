import { ApiProperty } from "@nestjs/swagger";
import {
  IsEAN,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsUrl,
} from "class-validator";

export class signinCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
export class signupCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty()
  @IsEmail()
  company_email: string;

  @ApiProperty()
  @IsNotEmpty()
  company_phone: string;

  @ApiProperty()
  @IsNotEmpty()
  company_address: string;

  @ApiProperty()
  @IsNotEmpty()
  responsable_name: string;

  @ApiProperty()
  @IsPhoneNumber("DZ")
  responsable_phone: string;

  @ApiProperty()
  @IsNotEmpty()
  responsable_role: string;

  @ApiProperty()
  @IsUrl()
  company_website: string;

  @ApiProperty()
  @IsNotEmpty()
  company_field: string;

  @ApiProperty()
  @IsNotEmpty()
  notes: string;
}
