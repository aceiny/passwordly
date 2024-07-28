import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { jwtPayload } from "src/auth/types/payload.type";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.create(createUserDto);
    this.userService.setCookie(token, res);
    return {
      message: "User created successfully",
      status: HttpStatus.CREATED,
    };
  }
  @Post("/signin")
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.login(createUserDto);
    this.userService.setCookie(token, res);
    return {
      message: "User logged in successfully",
      status: HttpStatus.OK,
    };
  }
  @Get("")
  @UseGuards(JwtAuthGuard)
  async findOne(@GetUser() user: jwtPayload) {
    const userObj = await this.userService.findOne(user.id);
    if (!userObj) throw new UnauthorizedException("User not found");
    return userObj;
  }

  @Patch("")
  @UseGuards(JwtAuthGuard)
  update(@GetUser() user: jwtPayload, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@GetUser() user: jwtPayload) {
    return this.userService.remove(user.id);
  }
}
