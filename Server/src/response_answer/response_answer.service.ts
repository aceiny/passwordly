import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponseAnswer } from "./response_answer.entity";
import { Repository } from "typeorm";
import { QuestionService } from "src/question/question.service";
import { ResponseService } from "src/response/response.service";
import { createResponseAnswerDto } from "./types/response_answer_request.types";
import { AnswerService } from "src/answer/answer.service";
@Injectable()
export class ResponseAnswerService {
  constructor(
    @InjectRepository(ResponseAnswer)
    private responseAnswerRepository: Repository<ResponseAnswer>,
    private questionService: QuestionService,
    private responseService: ResponseService,
  ) {}

  async getAllResponseAnswers(
    populate: boolean = false,
  ): Promise<ResponseAnswer[]> {
    const responseAnswers = await this.responseAnswerRepository.find({
      relations: populate ? ["question", "response", "answer"] : [],
    });
    return responseAnswers;
  }
  async getResponseAnswerById(
    id: string,
    populate: boolean = false,
  ): Promise<ResponseAnswer> {
    const responseAnswer = await this.responseAnswerRepository.findOne({
      where: {
        id: id,
      },
      relations: populate ? ["question", "response", "answer"] : [],
    });
    return responseAnswer;
  }
  async createResponseAnswer(
    reponseAnswerDto: createResponseAnswerDto,
    transactionalEntityManager?,
  ): Promise<ResponseAnswer> {
    try {
      const question = await this.questionService.fetchQuestion(
        reponseAnswerDto.question,
      );
      const response = reponseAnswerDto.response
        ? await this.responseService.fetchResponse(reponseAnswerDto.response)
        : null;
      const responseAnswer = await this.responseAnswerRepository.create({
        ...reponseAnswerDto,
        question: question,
        response: response,
        answer: reponseAnswerDto.answer,
      });
      if (transactionalEntityManager) {
        await transactionalEntityManager.save(responseAnswer);
      } else {
        await this.responseAnswerRepository.save(responseAnswer);
      }
      return responseAnswer;
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException("something went wrong");
    }
  }
}
