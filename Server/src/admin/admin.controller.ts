import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { adminSigninDto, adminSignupDto } from "./admin.dtos";
import { AdminService } from "./admin.service";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post("signup")
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: "create a new admin account" })
  async signupAdmin(
    @Body() adminDto: adminSignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.adminService.signupAdmin(adminDto, res);
  }

  @Post("signin")
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: "signin to existing admin account" })
  async signinAdmin(
    @Body() adminDto: adminSigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.adminService.signinAdmin(adminDto, res);
  }
}
