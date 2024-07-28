import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "src/company/company.entity";
import { Repository } from "typeorm";
import { CompanyProfile } from "./company_profile.entity";
import { jwtPayload } from "src/auth/types/payload.type";
import { stat } from "fs";
import { getCompanyProfileReturnDto } from "./types/company_profile.response_types";
import { NotFoundError } from "rxjs";

@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CompanyProfile)
    private readonly companyProfileRepository: Repository<CompanyProfile>,
  ) {}
  async fetchAllCompanies(
    populate: boolean = false,
  ): Promise<CompanyProfile[]> {
    const companies = await this.companyProfileRepository.find({
      relations: populate ? ["company"] : [],
      select: {
        company: {
          id: populate,
          username: populate,
          email: populate,
        },
      },
    });
    return companies;
  }
  async fetchCompanyProfile(
    id: string,
    populate: boolean = false,
  ): Promise<CompanyProfile> {
    const company_profile = await this.companyProfileRepository.findOne({
      where: {
        company: { id: id },
      },
      relations: populate ? ["company"] : [],
      select: {
        company: {
          id: populate,
          username: populate,
          email: populate,
        },
      },
    });
    if (!company_profile)
      throw new NotFoundException("this company doesnt exist");
    return company_profile;
  }
  async getCompanyProfile(company: jwtPayload): Promise<CompanyProfile> {
    const company_profile = await this.fetchCompanyProfile(company.id, true);
    return company_profile;
  }
}
