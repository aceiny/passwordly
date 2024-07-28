import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CollectorProfileService } from "./collector_profile.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { jwtPayload } from "src/auth/types/payload.type";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { updateCollectorProfileDto } from "./types/collector_profile.request_types";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { baseRoles } from "src/abstract/base.types";
import {
  deleteCollectorProfileReturnDto,
  getAllCollectorsReturnDto,
  getCollectorProfileReturnDto,
  updateCollectorProfileReturnDto,
} from "./types/collector_profile.response_types";
@ApiTags("collector profile")
@Controller("collector-profile")
export class CollectorProfileController {
  constructor(
    private readonly collectorProfileService: CollectorProfileService,
  ) {}
  @Get("all")
  @ApiOperation({ summary: "get all collectors profiles for admin" })
  @ApiBearerAuth("suroken")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  async getAllCollectors(): Promise<getAllCollectorsReturnDto> {
    const collectors =
      await this.collectorProfileService.getAllCollectors(true);
    return {
      message: "Collectors fetched",
      status: HttpStatus.OK,
      collectors: collectors,
    };
  }
  @Get("")
  @ApiOperation({ summary: "get collector profile using the token" })
  @ApiBearerAuth("suroken")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.collector)
  async getCollectorProfile(
    @GetUser() Collector: jwtPayload,
  ): Promise<getCollectorProfileReturnDto> {
    const collector = await this.collectorProfileService.getCollectorProfile(
      Collector,
      true,
    );
    return {
      message: "Collector fetched",
      status: HttpStatus.OK,
      collector: collector,
    };
  }

  @Get("/:collectorId")
  @ApiOperation({ summary: "get collector profile by id , for admin " })
  @ApiBearerAuth("suroken")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.admin)
  async getCollectorProfileById(
    @Param("collectorId", new ParseUUIDPipe()) collectorId: string,
  ): Promise<getCollectorProfileReturnDto> {
    const collector = await this.collectorProfileService.getCollectorById(
      collectorId,
      true,
    );
    return {
      message: "Collector fetched",
      status: HttpStatus.OK,
      collector: collector,
    };
  }

  @Put("")
  @ApiOperation({ summary: "update collector profile information(s)" })
  @ApiBearerAuth("suroken")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.collector)
  async updateCollectorProfile(
    // to be modified for security reasons
    @GetUser() Collector: jwtPayload,
    @Body() collectorDto: Partial<updateCollectorProfileDto>,
  ): Promise<updateCollectorProfileReturnDto> {
    const collector_profile =
      await this.collectorProfileService.updateCollectorProfile(
        Collector,
        collectorDto,
      );
    return {
      message: "profile updated",
      status: HttpStatus.OK,
      collector: collector_profile,
    };
  }
  @Delete("")
  @ApiOperation({ summary: "delete collector and his profile " })
  @ApiBearerAuth("suroken")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(baseRoles.collector)
  async deleteCollectorProfile(
    @GetUser() Collector: jwtPayload,
  ): Promise<deleteCollectorProfileReturnDto> {
    const deleted =
      await this.collectorProfileService.deleteCollector(Collector);
    return {
      message: "collector account deleted",
      status: HttpStatus.OK,
    };
  }
}
