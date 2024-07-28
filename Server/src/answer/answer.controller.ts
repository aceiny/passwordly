import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { baseRoles } from "src/abstract/base.types";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { AnswerService } from "./answer.service";
import { createAnswerDto } from "./types/answer_request.types";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { jwtPayload } from "src/auth/types/payload.type";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("answer")
@Controller("answer")
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get("")
  @ApiOperation({ summary: "get all  answers for admin" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  async getAllAnswers() {
    const answers = await this.answerService.getAllAnswers(true);
    return {
      message: "Answers fetched successfully",
      status: HttpStatus.OK,
      answers: answers,
    };
  }

  @Get("/:answerId")
  @ApiOperation({ summary: "get answers by id for admin" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  async getAnswerById(
    @Param("answerId", new ParseUUIDPipe()) answerId: string,
  ) {
    const answers = await this.answerService.getAnswerById(answerId, true);
    return {
      message: "Answers fetched successfully",
      status: HttpStatus.OK,
      answers: answers,
    };
  }

  @ApiOperation({ summary: "get all survey answers for admin" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  @UsePipes(ValidationPipe)
  @Get("/survey/:surveyId")
  async getAnswersBySurveyId(
    @Param("surveyId", new ParseUUIDPipe()) surveyId: string,
  ) {
    const answers = await this.answerService.getAnswersBySurveyId(
      surveyId,
      true,
    );
    return {
      message: "Answers fetched successfully",
      status: HttpStatus.OK,
      answers: answers,
    };
  }
  @Post("")
  @ApiOperation({ summary: "add survey answer" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.collector)
  @UsePipes(ValidationPipe)
  async createAnswer(
    @Body() answerDto: createAnswerDto,
    @GetUser() collector: jwtPayload,
  ) {
    return this.answerService.createAnswer(answerDto, collector);
  }
}
