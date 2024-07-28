import { ApiProperty } from "@nestjs/swagger";

export class updateCollectorProfileDto {
  @ApiProperty({
    required: false,
  })
  firstname: string;

  @ApiProperty({
    required: false,
  })
  lastname: string;

  @ApiProperty({
    required: false,
  })
  birth_date: Date;

  @ApiProperty({
    required: false,
  })
  phone_number: string;
}
