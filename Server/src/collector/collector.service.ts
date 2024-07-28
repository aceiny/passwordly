import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Collector } from "./collector.entity";
import { Repository } from "typeorm";
import { Response } from "express";
import { CollectorProfile } from "src/collector_profile/collector_profile.entity";
import {
  signinCollectorDto,
  signupCollectorDto,
} from "./types/collector.request_types";
import * as bcrypt from "bcrypt";
import { jwtPayload } from "src/auth/types/payload.type";
import { JwtService } from "@nestjs/jwt";
import { baseReturnType } from "src/abstract/base.types";
import { NotFoundError, throwError } from "rxjs";
@Injectable()
export class CollectorService {
  constructor(
    @InjectRepository(Collector)
    private readonly collectorRepository: Repository<Collector>,
    @InjectRepository(CollectorProfile)
    private readonly collectorProfileRepository: Repository<CollectorProfile>,
    private readonly jwtService: JwtService,
  ) {}

  setCookie(token: string, res: Response) {
    res.cookie(process.env.COOKIE_NAME || "jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000 * 24 * 7, // dont forget to update this later
    });
  }
  async fetchCollector(collectorId: string) {
    const collector = await this.collectorRepository.findOne({
      where: {
        id: collectorId,
      },
    });
    if (!collector) throw new NotFoundException("Collector Not Found");
    return collector;
  }
  private async findUser(identifier: string) {
    const user = await this.collectorRepository.findOne({
      where: [{ email: identifier }, { phone_number: identifier }],
    });
    if (!user) {
      throw new ConflictException("Invalid credentials");
    }
    return user;
  }
  private async emailExists(email: string) {
    const emailExist = await this.collectorRepository.findOne({
      where: {
        email: email,
      },
    });
    if (emailExist) {
      throw new ConflictException("Email already exists");
    }
    return !!emailExist;
  }
  private async phoneExists(phone_number: string) {
    const phoneNumberExist = await this.collectorRepository.findOne({
      where: {
        phone_number: phone_number,
      },
    });
    if (phoneNumberExist) {
      throw new ConflictException("phone number already used");
    }
    return !!phoneNumberExist;
  }
  async signinCollector(
    collectorDto: signinCollectorDto,
    res: Response,
  ): Promise<baseReturnType> {
    const user = await this.findUser(collectorDto.identifier);
    if (!(await bcrypt.compare(collectorDto.password, user.password))) {
      throw new ConflictException("Invalid credentials");
    }
    const payload: jwtPayload = {
      id: user.id,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    this.setCookie(token, res);
    return {
      message: "Collector signed in successfully",
      status: 201,
    };
  }
  async signupCollector(collectorDto: signupCollectorDto, res: Response) {
    await this.emailExists(collectorDto.email);
    await this.phoneExists(collectorDto.phone_number);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(collectorDto.password, salt);

    let collector: Collector;

    try {
      await this.collectorRepository.manager.transaction(
        async (transactionalEntityManager) => {
          collector = this.collectorRepository.create({
            ...collectorDto,
            password: hashedPassword,
          });

          await transactionalEntityManager.save(collector);

          const collectorProfile = this.collectorProfileRepository.create({
            ...collectorDto,
            collector: collector,
          });

          await transactionalEntityManager.save(collectorProfile);
        },
      );
    } catch (error) {
      throw new ConflictException("An error occurred while signing up");
    }

    const payload: jwtPayload = {
      id: collector.id,
      role: collector.role,
    };
    const token = this.jwtService.sign(payload);
    this.setCookie(token, res);

    return {
      message: "Collector signed up successfully",
      status: 201,
    };
  }
}
