import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import {
  signinCompanyDto,
  signupCompanyDto,
} from "./types/company.request_types";
import { Response } from "express";
import { signupCollectorDto } from "src/collector/types/collector.request_types";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { baseRoles } from "src/abstract/base.types";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Company")
@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post("/signin")
  @UsePipes(ValidationPipe)
  async signinCollector(
    @Body() companyDto: signinCompanyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    RolesGuard;
    return this.companyService.signinCompany(companyDto, res);
  }

  @Post("/signup")
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  async signupCollector(
    @Body() companyDto: signupCompanyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.companyService.signupCompany(companyDto, res);
  }
}
