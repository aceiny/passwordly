import { Module } from "@nestjs/common";
import { SurveyService } from "./survey.service";
import { SurveyController } from "./survey.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "./survey.entity";
import { Admin } from "src/admin/admin.entity";
import { Course } from "src/course/course.entity";
import { Company } from "src/company/company.entity";
import { AuthModule } from "src/auth/auth.module";
import { Collector } from "src/collector/collector.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, Admin, Course, Company, Collector]),
    AuthModule,
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
  exports: [SurveyService],
})
export class SurveyModule {}
