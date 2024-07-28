import { Module } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { Response } from "src/response/response.entity";
import { AuthModule } from "src/auth/auth.module";
import { ResponseModule } from "src/response/response.module";
import { SurveyModule } from "src/survey/survey.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Response]),
    AuthModule,
    ResponseModule,
    SurveyModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
