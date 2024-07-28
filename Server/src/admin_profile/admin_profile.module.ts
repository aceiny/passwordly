import { Module } from "@nestjs/common";
import { AdminProfileController } from "./admin_profile.controller";
import { AdminProfileService } from "./admin_profile.service";

@Module({
  controllers: [AdminProfileController],
  providers: [AdminProfileService],
  imports: [],
})
export class AdminProfileModule {}
