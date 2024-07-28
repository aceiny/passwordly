import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { PostgresConfig } from "config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from "./redis/redis.module";
import { AdminProfileModule } from "./admin_profile/admin_profile.module";
import { CollectorProfileModule } from "./collector_profile/collector_profile.module";
import { CollectorModule } from "./collector/collector.module";
import { CompanyModule } from "./company/company.module";
import { CompanyProfileModule } from "./company_profile/company_profile.module";
import { SurveyModule } from "./survey/survey.module";
import { CourseModule } from "./course/course.module";
import { QuestionModule } from "./question/question.module";
import { ResponseModule } from "./response/response.module";
import { AnswerModule } from "./answer/answer.module";
import { ResponseAnswerModule } from "./response_answer/response_answer.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(PostgresConfig),
    AuthModule,
    AdminModule,
    RedisModule,
    AdminProfileModule,
    CollectorProfileModule,
    CollectorModule,
    CompanyModule,
    CompanyProfileModule,
    SurveyModule,
    CourseModule,
    QuestionModule,
    ResponseModule,
    AnswerModule,
    ResponseAnswerModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
