import { Module } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CompanyController } from "./company.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./company.entity";
import { CompanyProfile } from "src/company_profile/company_profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyProfile]), AuthModule],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
