import { Module } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { PasswordController } from "./password.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Password } from "./entities/password.entity";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Password]), AuthModule, UserModule],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
