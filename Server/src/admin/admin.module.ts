import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./admin.entity";
import { AuthModule } from "src/auth/auth.module";
import { AdminProfile } from "src/admin_profile/admin_profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Admin, AdminProfile]), AuthModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
