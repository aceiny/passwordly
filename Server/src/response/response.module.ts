import { Module } from "@nestjs/common";
import { ResponseController } from "./response.controller";
import { ResponseService } from "./response.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Response } from "./response.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  controllers: [ResponseController],
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ResponseModule {}
