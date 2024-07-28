import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "./company.entity";
import { CompanyProfile } from "src/company_profile/company_profile.entity";
import { Repository } from "typeorm";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import {
  signinCompanyDto,
  signupCompanyDto,
} from "./types/company.request_types";
import { JwtService } from "@nestjs/jwt";
import { jwtPayload } from "src/auth/types/payload.type";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CompanyProfile)
    private readonly companyProfileRepository: Repository<CompanyProfile>,
    private readonly jwtService: JwtService,
  ) {}
  setCookie(token: string, res: Response) {
    res.cookie(process.env.COOKIE_NAME || "jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000 * 24, // dont forget to update this later
    });
  }
  async emailExists(email: string) {
    const emailExist = await this.companyRepository.findOne({
      where: {
        email: email,
      },
    });
    if (emailExist) {
      throw new ConflictException("Email already exists");
    }
    return !!emailExist;
  }
  async companyExists(email: string) {
    const company = await this.companyRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!company) {
      throw new ConflictException("Invalid credentials");
    }
    return company;
  }
  async signinCompany(companyDto: signinCompanyDto, res: Response) {
    const company = await this.companyExists(companyDto.email);
    if (!(await bcrypt.compare(companyDto.password, company.password))) {
      throw new ConflictException("Invalid credentials");
    }
    const payload = {
      id: company.id,
      role: company.role,
    };
    const token = this.jwtService.sign(payload);
    this.setCookie(token, res);
    return {
      message: "Company signed in successfully",
      status: HttpStatus.CREATED,
    };
  }
  async signupCompany(companyDto: signupCompanyDto, res: Response) {
    await this.emailExists(companyDto.email);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(companyDto.password, salt);
    let company: Company;
    try {
      await this.companyRepository.manager.transaction(
        async (transactionalEntityManager) => {
          company = await transactionalEntityManager.save(
            this.companyRepository.create({
              ...companyDto,
              password: hashedPassword,
            }),
          );
          await transactionalEntityManager.save(
            this.companyProfileRepository.create({
              ...companyDto,
              company: company,
            }),
          );
        },
      );
      const payload: jwtPayload = {
        id: company.id,
        role: company.role,
      };
      const token = this.jwtService.sign(payload);
      this.setCookie(token, res);
      return {
        message: "Company created successfully",
        status: 201,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        "Something went wrong while creating company",
      );
    }
  }
}
