import { Module } from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { AnswerController } from "./answer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Answer } from "./answer.entity";
import { ResponseAnswerModule } from "src/response_answer/response_answer.module";
import { CollectorProfileModule } from "src/collector_profile/collector_profile.module";
import { SurveyModule } from "src/survey/survey.module";
import { AuthModule } from "src/auth/auth.module";
import { CollectorModule } from "src/collector/collector.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    ResponseAnswerModule,
    CollectorModule,
    SurveyModule,
    AuthModule,
  ],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
