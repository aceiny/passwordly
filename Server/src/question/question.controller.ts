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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { QuestionService } from "./question.service";
import { createQuestionDto } from "./types/question_request.types";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { jwtPayload } from "src/auth/types/payload.type";
import { Roles } from "src/auth/decorators/roles.decorator";
import { baseRoles } from "src/abstract/base.types";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import {
  createQuestionReturnDto,
  getQuestionReturnDto,
} from "./types/question_response.types";

@ApiTags("Question")
@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post("")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: "Create a new question for a survey" })
  async createQuestion(
    @Body() questionDto: createQuestionDto,
    @GetUser() admin: jwtPayload,
  ): Promise<createQuestionReturnDto> {
    const question = await this.questionService.createQuestionForSurvey(
      questionDto,
      admin,
    );
    return {
      message: "Question created successfully",
      status: HttpStatus.CREATED,
      question: question,
    };
  }
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  @ApiOperation({ summary: "Fetch all questions" })
  async fetchQuestions(): Promise<getQuestionReturnDto> {
    const questions = await this.questionService.fetchQuestions(true);
    return {
      message: "Questions fetched successfully",
      status: HttpStatus.OK,
      questions: questions,
    };
  }
  @Get("/survey/:surveyId")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.collector)
  @ApiOperation({ summary: "Fetch all questions for a survey" })
  async fetchSurveyQuestions(
    @Param("surveyId", new ParseUUIDPipe()) surveyId: string,
  ): Promise<getQuestionReturnDto> {
    const questions = await this.questionService.fetchAllQuestionsForSurvey(
      surveyId,
      true,
    );
    return {
      message: "Questions fetched successfully",
      status: HttpStatus.OK,
      questions: questions,
    };
  }
}
