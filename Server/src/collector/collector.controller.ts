import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CollectorService } from "./collector.service";
import {
  signinCollectorDto,
  signupCollectorDto,
} from "./types/collector.request_types";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Collector")
@Controller("collector")
export class CollectorController {
  constructor(private readonly collectorService: CollectorService) {}

  @Post("/signin")
  @UsePipes(ValidationPipe)
  async signinCollector(
    @Body() collectorDto: signinCollectorDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.collectorService.signinCollector(collectorDto, res);
  }
  @Post("/signup")
  @UsePipes(ValidationPipe)
  async signupCollector(
    @Body() collectorDto: signupCollectorDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.collectorService.signupCollector(collectorDto, res);
  }
}
