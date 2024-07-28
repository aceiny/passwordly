import { Module } from "@nestjs/common";
import { CollectorProfileService } from "./collector_profile.service";
import { CollectorProfileController } from "./collector_profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollectorProfile } from "./collector_profile.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([CollectorProfile]), AuthModule],
  providers: [CollectorProfileService],
  controllers: [CollectorProfileController],
  exports: [CollectorProfileService],
})
export class CollectorProfileModule {}
