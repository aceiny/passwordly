import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Answer } from "./answer.entity";
import { Repository } from "typeorm";
import { ResponseAnswerService } from "src/response_answer/response_answer.service";
import { CollectorProfileService } from "src/collector_profile/collector_profile.service";
import { SurveyService } from "src/survey/survey.service";
import { createAnswerDto } from "./types/answer_request.types";
import { Survey } from "src/survey/survey.entity";
import { jwtPayload } from "src/auth/types/payload.type";
import { CollectorService } from "src/collector/collector.service";

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private responseAnswerService: ResponseAnswerService,
    private collectorService: CollectorService,
    private surveyService: SurveyService,
  ) {}
  async checkAnswer(answerDto: createAnswerDto, survey: Survey) {
    const questionsMap = new Map(survey.questions.map((q) => [q.id, q]));

    for (const answer of answerDto.response_answer) {
      const questionId = answer.question;
      const responseId = answer.response;
      const answerText = answer.answer_text;

      const question = questionsMap.get(questionId);
      if (!question) {
        throw new NotFoundException(
          `Question with ID ${questionId} not found in the survey`,
        );
      }

      if (responseId !== undefined && responseId !== null) {
        const validResponseIds = new Set(question.responses.map((r) => r.id));
        if (!validResponseIds.has(responseId)) {
          throw new ConflictException(
            `Invalid response ID: ${responseId} for question ID: ${questionId}`,
          );
        }
      } else if (answerText !== undefined && answerText !== null) {
        if (!["text", "textarea"].includes(question.question_type)) {
          throw new ConflictException(
            `Text answer not allowed for question type: ${question.question_type}`,
          );
        }
      } else {
        throw new ConflictException(
          `No response or answer_text provided for question ID: ${questionId}`,
        );
      }
    }
  }

  async getAllAnswers(populate: boolean = false): Promise<Answer[]> {
    const answers = await this.answerRepository.find({
      relations: populate
        ? [
            "collector",
            "response_answer",
            "response_answer.question",
            "response_answer.response",
          ]
        : [],
    });
    for (let answer of answers) {
      answer.collector.password = undefined;
    }
    return answers;
  }
  async getAnswerById(
    answerId: string,
    populate: boolean = false,
  ): Promise<Answer> {
    const answer = await this.answerRepository.findOne({
      where: {
        id: answerId,
      },
      relations: populate
        ? [
            "collector",
            "response_answer",
            "response_answer.question",
            "response_answer.response",
          ]
        : [],
    });

    if (!answer) throw new NotFoundException("Answer not found");
    populate ? (answer.collector.password = undefined) : null;
    return answer;
  }
  async getAnswersBySurveyId(
    surveyId: string,
    populate: boolean = false,
  ): Promise<Answer[]> {
    const answers = await this.answerRepository.find({
      where: {
        survey: { id: surveyId },
      },
      relations: populate
        ? [
            "collector",
            "response_answer",
            "response_answer.question",
            "response_answer.response",
          ]
        : [],
    });
    for (let answer of answers) {
      answer.collector.password = undefined;
    }
    return answers;
  }
  async createAnswer(
    answerDto: createAnswerDto,
    collector: jwtPayload,
  ): Promise<Answer> {
    try {
      const survey = await this.surveyService.fetchSurvey(
        answerDto.survey,
        true,
      );

      // Make checkAnswer async and await it
      await this.checkAnswer(answerDto, survey);

      const fetchedCollector = await this.collectorService.fetchCollector(
        collector.id,
      );

      let answer: Answer;
      await this.answerRepository.manager.transaction(
        async (transactionalEntityManager) => {
          answer = this.answerRepository.create({
            survey: survey,
            collector: fetchedCollector,
          });
          await transactionalEntityManager.save(answer);

          for (const data of answerDto.response_answer) {
            await this.responseAnswerService.createResponseAnswer(
              {
                ...data,
                answer: answer,
              },
              transactionalEntityManager,
            );
          }
        },
      );
      answer.collector = undefined;
      answer.survey = undefined;
      return answer;
    } catch (err) {
      console.error("Error in createAnswer:", err);
      if (
        err instanceof NotFoundException ||
        err instanceof ConflictException
      ) {
        throw err;
      }
      throw new InternalServerErrorException("Error while saving answer");
    }
  }
}
