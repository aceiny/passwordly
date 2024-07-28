import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PasswordService } from "./password.service";
import { CreatePasswordDto } from "./dto/create-password.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { jwtPayload } from "src/auth/types/payload.type";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags('Password')
@Controller("password")
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post()
  @ApiOperation({summary : "Create a new password"})
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createPasswordDto: CreatePasswordDto,
    @GetUser() user: jwtPayload,
  ) {
    return this.passwordService.create(createPasswordDto, user.id);
  }

  @Get()
  @ApiOperation({summary : "Get all logged in user passwords"})
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: jwtPayload) {
    return this.passwordService.findAll(user.id);
  }

  @Get(":id")
  @ApiOperation({summary : "Get a user password by id"})
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string, @GetUser() user: jwtPayload) {
    return this.passwordService.findOne(id, user.id);
  }

  @Patch(":id")
  @ApiOperation({summary : "Update a user password by id"})
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @GetUser() user: jwtPayload,
  ) {
    return this.passwordService.update(id, updatePasswordDto);
  }

  @Delete(":id")
  @ApiOperation({summary : "Delete a user password by id"})
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string, @GetUser() user: jwtPayload) {
    return this.passwordService.remove(id);
  }
}
