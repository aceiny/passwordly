import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { Question } from "./question.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { createQuestionDto } from "./types/question_request.types";
import { jwtPayload } from "src/auth/types/payload.type";
import { ResponseService } from "src/response/response.service";
import { SurveyService } from "src/survey/survey.service";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private responseService: ResponseService,
    private surveyService: SurveyService,
  ) {}
  async fetchQuestion(id: string, populate: boolean = false) {
    const question = await this.questionRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!question) {
      throw new NotFoundException("Question not found");
    }
    return question;
  }
  async fetchQuestions(populate: boolean = false) {
    const questions = await this.questionRepository.find({
      relations: populate ? ["responses"] : [],
    });
    return questions;
  }
  async createQuestionForSurvey(
    questionDto: createQuestionDto,
    admin?: jwtPayload,
  ) {
    const survey = await this.surveyService.fetchSurvey(questionDto.survey);

    let question: Question;
    try {
      await this.questionRepository.manager.transaction(
        async (transactionalEntityManager) => {
          question = this.questionRepository.create({
            ...questionDto,
            survey: survey,
          });
          question = await transactionalEntityManager.save(question);
          for (const response of questionDto.responses) {
            await this.responseService.createResponse(
              response,
              question,
              transactionalEntityManager,
            );
          }
        },
      );
      return question;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException("Error while saving question");
    }
  }
  async fetchAllQuestionsForSurvey(
    surveyId: string,
    populate: boolean = false,
  ): Promise<Question[]> {
    const questions = await this.questionRepository.find({
      where: {
        survey: {
          id: surveyId,
        },
      },
      relations: populate ? ["responses"] : [],
    });

    return questions;
  }
}
