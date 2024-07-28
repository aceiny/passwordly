import { Module } from "@nestjs/common";
import { ResponseAnswerService } from "./response_answer.service";
import { ResponseAnswerController } from "./response_answer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResponseAnswer } from "./response_answer.entity";
import { ResponseModule } from "src/response/response.module";
import { QuestionModule } from "src/question/question.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ResponseAnswer]),
    QuestionModule,
    ResponseModule,
  ],
  providers: [ResponseAnswerService],
  controllers: [ResponseAnswerController],
  exports: [ResponseAnswerService],
})
export class ResponseAnswerModule {}
