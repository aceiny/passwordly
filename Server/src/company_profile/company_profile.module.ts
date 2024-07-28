import { Module } from "@nestjs/common";
import { CompanyProfileService } from "./company_profile.service";
import { CompanyProfileController } from "./company_profile.controller";
import { CompanyProfile } from "./company_profile.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "src/company/company.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyProfile]), AuthModule],
  providers: [CompanyProfileService],
  controllers: [CompanyProfileController],
})
export class CompanyProfileModule {}
