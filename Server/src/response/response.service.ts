import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "./response.entity";
import { Repository } from "typeorm";
import { createResponseDto } from "./types/response_request.types";
import { Question } from "src/question/question.entity";
import { cp } from "fs";
import { NotFoundError } from "rxjs";

@Injectable()
export class ResponseService {
  $;
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {}

  async fetchResponse(
    id: string,
    populate: boolean = false,
  ): Promise<Response> {
    const response = await this.responseRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!response) {
      throw new NotFoundException("Response not found");
    }
    return response;
  }
  async createResponse(
    responseDto: createResponseDto,
    question: Question,
    transactionalEntityManager?,
  ): Promise<Response> {
    try {
      const response = this.responseRepository.create({
        ...responseDto,
        question: question,
      });
      await transactionalEntityManager.save(response);
      return response;
    } catch (error) {
      throw new Error("Error while saving response");
    }
  }
}
