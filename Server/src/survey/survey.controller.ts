import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { SurveyService } from "./survey.service";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { baseRoles } from "src/abstract/base.types";
import {
  createSurveyDto,
  updateSurveyDto,
  updateSurveyStatus,
} from "./types/survey_request.types";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { jwtPayload } from "src/auth/types/payload.type";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Survey")
@Controller("survey")
export class SurveyController {
  constructor(private surveyService: SurveyService) {}
  @Post("")
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("suroken")
  @Roles(baseRoles.admin)
  @ApiOperation({ summary: "Create a new survey for admin only" })
  createSurvey(
    @Body() surveyDto: createSurveyDto,
    @GetUser() admin: jwtPayload,
  ) {
    return this.surveyService.createSurvey(surveyDto, admin);
  }
  @Get("")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  @ApiBearerAuth("suroken")
  @ApiOperation({ summary: "Fetch all surveys for admin only" })
  fetchAllSurveys() {
    return this.surveyService.getAllSurvies();
  }
  @Get("/collector")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.collector)
  @ApiBearerAuth("suroken")
  @ApiOperation({
    summary:
      "Fetch all surveys for a collector based on his willaya ; ps : for now the willaya is static its set to oran ",
  })
  fetchSurviesForCollector(@GetUser() collector: jwtPayload) {
    return this.surveyService.getSurveysForCollector(collector);
  }

  @Get("/company")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.company)
  @ApiBearerAuth("suroken")
  @ApiOperation({
    summary: "Fetch all surveys for a company by company ( by token ) ",
  })
  fetchSurveysByCompanyForCompany(@GetUser() company: jwtPayload) {
    return this.surveyService.getSurviesByCompany(company.id);
  }
  @Get("/company/:companyId")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("suroken")
  @Roles(baseRoles.company, baseRoles.admin)
  @ApiOperation({
    summary:
      "Fetch all surveys for a company by admin ( by company id as params) ",
  })
  fetchSurveysByCompany(
    @Param("companyId", new ParseUUIDPipe()) companyId: string,
  ) {
    return this.surveyService.getSurviesByCompany(companyId);
  }
  @Get("/:surveyId")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Fetch a survey by id" })
  fetchSurveyById(@Param("surveyId", new ParseUUIDPipe()) surveyId: string) {
    return this.surveyService.getSurveyById(surveyId);
  }

  @Put("/:surveyId")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  @ApiBearerAuth("suroken")
  @ApiOperation({ summary: "Update a survey by id" })
  updateSurvey(
    @Param("surveyId", new ParseUUIDPipe()) surveyId: string,
    @Body() surveyDto: Partial<updateSurveyDto>,
  ) {
    return this.surveyService.updateSurvey(surveyDto, surveyId);
  }

  @Put("/status/:surveyId")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  @ApiBearerAuth("suroken")
  @ApiOperation({ summary: "Update a survey status by id (active , inactive)" })
  updateSurveyStatus(
    @Param("surveyId", new ParseUUIDPipe()) surveyId: string,
    @Body() surveyDto: updateSurveyStatus,
  ) {
    return this.surveyService.updateSurveyStatus(surveyDto.status, surveyId);
  }
}
