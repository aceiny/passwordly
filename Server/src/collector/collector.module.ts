import { Module } from "@nestjs/common";
import { CollectorController } from "./collector.controller";
import { CollectorService } from "./collector.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Collector } from "./collector.entity";
import { CollectorProfile } from "src/collector_profile/collector_profile.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Collector, CollectorProfile]),
    AuthModule,
  ],
  controllers: [CollectorController],
  providers: [CollectorService],
  exports: [CollectorService],
})
export class CollectorModule {}
