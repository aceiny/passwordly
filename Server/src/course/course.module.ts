import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";

@Module({
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
