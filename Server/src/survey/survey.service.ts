import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { Survey } from "./survey.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  createSurveyDto,
  surveyStatus,
  updateSurveyDto,
} from "./types/survey_request.types";
import { createSurveyReturnDto } from "./types/survey_response.types";
import { jwtPayload } from "src/auth/types/payload.type";
import { Admin } from "src/admin/admin.entity";
import { Company } from "src/company/company.entity";
import { UUID } from "crypto";
import { Collector } from "src/collector/collector.entity";

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Collector)
    private collectorRepository: Repository<Collector>,
  ) {}
  async fetchAdmin(id: string) {
    const admin = await this.adminRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!admin) {
      throw new ConflictException("Admin not found");
    }
    admin.password = undefined;
    return admin;
  }
  async fetchCompany(id: string) {
    const company = await this.companyRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!company) {
      throw new ConflictException("Company not fuond");
    }
    company.password = undefined;
    return company;
  }
  async fetchSurvey(id: string, populate: boolean = false) {
    const relations = populate ? ["questions", "questions.responses"] : [];
    const survey = await this.surveyRepository.findOne({
      where: {
        id: id,
      },
      relations,
    });

    if (!survey) {
      throw new NotFoundException("Survey not found");
    }
    return survey;
  }
  async createSurvey(
    surveyDto: createSurveyDto,
    admin: jwtPayload,
  ): Promise<createSurveyReturnDto> {
    const adminObj = await this.fetchAdmin(admin.id);
    const companyObj = await this.fetchCompany(surveyDto.company);
    let survey: Survey;
    try {
      await this.surveyRepository.manager.transaction(
        async (transactionalEntityManager) => {
          survey = this.surveyRepository.create({
            ...surveyDto,
            company: companyObj,
            admin: adminObj,
          });
          await transactionalEntityManager.save(survey);
        },
      );
      return {
        message: "Survey created successfully",
        status: HttpStatus.CREATED,
        survey: survey,
      };
    } catch (err) {
      console.error(`Error while creating survey ${err}`);
      throw new InternalServerErrorException("Error while creating survey");
    }
  }
  async getSurveysForCollector(collector: jwtPayload) {
    const collectorObj = await this.collectorRepository.findOne({
      where: { id: collector.id },
    });

    if (!collectorObj) {
      throw new ConflictException("Collector not found");
    }

    let willaya = "oran"; // The willaya you want to filter by
    willaya = willaya.charAt(0).toUpperCase() + willaya.slice(1);
    const surveys = await this.surveyRepository
      .createQueryBuilder("survey")
      .where("survey.status = :status", { status: "active" })
      .andWhere("survey.wilaya @> :willayaData", {
        willayaData: JSON.stringify([{ willaya_name: willaya }]),
      })
      .getMany();

    return {
      message: `Surveys fetched successfully for willaya: ${willaya}`,
      status: HttpStatus.OK,
      surveys: surveys,
    };
  }
  async getAllSurvies() {
    const surveys = await this.surveyRepository.find({});
    return {
      message: "All surveys fetched successfully",
      status: HttpStatus.OK,
      surveys: surveys,
    };
  }
  async getSurviesByCompany(companyId: string) {
    const surveys = await this.surveyRepository.find({
      where: {
        company: {
          id: companyId,
        },
      },
    });
    return {
      message: "All surveys fetched successfully",
      status: HttpStatus.OK,
      surveys: surveys,
    };
  }
  async getSurveyById(surveyId: string) {
    const survey = await this.fetchSurvey(surveyId , true);
    return {
      message: "Survey fetched successfully",
      status: HttpStatus.OK,
      survey: survey,
    };
  }
  async updateSurvey(surveyDto: Partial<updateSurveyDto>, surveyId: string) {
    const survey = await this.fetchSurvey(surveyId);
    Object.assign(survey, surveyDto);
    try {
      await this.surveyRepository.save(survey);
      return {
        message: "Survey updated successfully",
        status: HttpStatus.OK,
        survey: survey,
      };
    } catch (err) {
      throw new InternalServerErrorException("Error while updating survey");
    }
  }
  async updateSurveyStatus(status: surveyStatus, surveyId: string) {
    const survey = await this.fetchSurvey(surveyId);
    survey.status = status;
    try {
      await this.surveyRepository.save(survey);
      return {
        message: "Survey status updated successfully",
        status: HttpStatus.OK,
        survey: survey,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        "Error while updating survey status",
      );
    }
  }
}
