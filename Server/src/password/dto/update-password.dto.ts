import { PartialType } from "@nestjs/swagger";
import { CreatePasswordDto } from "./create-password.dto";

export class UpdatePasswordDto extends PartialType(CreatePasswordDto) {}
