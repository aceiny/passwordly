import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CollectorProfile } from "./collector_profile.entity";
import { jwtPayload } from "src/auth/types/payload.type";

import { updateCollectorProfileDto } from "./types/collector_profile.request_types";

@Injectable()
export class CollectorProfileService {
  constructor(
    @InjectRepository(CollectorProfile)
    private collectorProfileRepository: Repository<CollectorProfile>,
  ) {}

  async fetchCollectorProfile(
    id: string,
    populate: boolean = false,
  ): Promise<CollectorProfile> {
    const collector_profile = await this.collectorProfileRepository.findOne({
      where: {
        collector: { id: id },
      },
      relations: populate ? ["collector"] : [],
      select: {
        collector: {
          id: populate,
          email: populate,
          phone_number: populate,
        },
      },
    });
    if (!collector_profile)
      throw new ConflictException("this user doesnt exist");
    return collector_profile;
  }
  async getCollectorProfile(Collector: jwtPayload, populate: boolean = false) {
    const collector_profile = await this.fetchCollectorProfile(
      Collector.id,
      true,
    );
    return collector_profile;
  }
  async getAllCollectors(populate: boolean = false) {
    const collectors = await this.collectorProfileRepository.find({
      relations: populate ? ["collector"] : [],
      select: {
        collector: {
          id: populate,
          email: populate,
          phone_number: populate,
        },
      },
    });
    return collectors;
  }
  async getCollectorById(collectorId: string, populate: boolean = false) {
    const collector_profile = await this.fetchCollectorProfile(
      collectorId,
      populate,
    );
    return collector_profile;
  }
  async updateCollectorProfile(
    Collector: jwtPayload,
    collectorDto: Partial<updateCollectorProfileDto>,
  ) {
    const collector_profile = await this.fetchCollectorProfile(Collector.id);
    Object.assign(collector_profile, collectorDto);
    await this.collectorProfileRepository.save(collector_profile);
    return collector_profile;
  }
  async deleteCollector(Collector: jwtPayload) {
    try {
      const deleted_collector = await this.collectorProfileRepository.delete(
        Collector.id,
      );
      if (deleted_collector.affected == 0) {
        throw new ConflictException("this user doesnt exist");
      }
      return true;
    } catch (err) {
      if (err instanceof ConflictException) {
        throw err;
      }
      throw new InternalServerErrorException("Something went wrong");
    }
  }
}
