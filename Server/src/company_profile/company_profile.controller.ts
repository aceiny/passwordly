import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { baseRoles } from "src/abstract/base.types";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { jwtPayload } from "src/auth/types/payload.type";
import { CompanyProfileService } from "./company_profile.service";
import { getCompanyProfileReturnDto } from "./types/company_profile.response_types";

@ApiTags("Company Profile")
@Controller("company-profile")
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @Get("")
  @ApiOperation({ summary: "get company profile using the token" })
  @ApiBearerAuth("suroken")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.company)
  async getcompanyProfile(
    @GetUser() company: jwtPayload,
  ): Promise<getCompanyProfileReturnDto> {
    const company_profile =
      await this.companyProfileService.getCompanyProfile(company);
    return {
      message: "Company fetched succesfully",
      status: HttpStatus.OK,
      company: company_profile,
    };
  }

  @Get("/all")
  @ApiOperation({ summary: "get all companies profiles by id for admin" })
  @ApiBearerAuth("suroken")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  async getAllCompanies(): Promise<any> {
    const companies = await this.companyProfileService.fetchAllCompanies(true);
    return {
      message: "Companies fetched succesfully",
      status: HttpStatus.OK,
      companies: companies,
    };
  }

  @Get("all/:companyId")
  @ApiOperation({ summary: "get company profile by id for admin" })
  @ApiBearerAuth("suroken")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  async getcompanyProfileForAdmin(
    @Param("companyId", new ParseUUIDPipe()) companyId: string,
  ): Promise<getCompanyProfileReturnDto> {
    const company_profile =
      await this.companyProfileService.fetchCompanyProfile(companyId, true);
    return {
      message: "Company fetched succesfully",
      status: HttpStatus.OK,
      company: company_profile,
    };
  }
}
