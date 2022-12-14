import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors
} from "@nestjs/common"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"

import { CreateStatisticsEntry } from "./dtos/create.dto"
import StatisticsEntries from "./dtos/entries.dto"
import StatisticsFilters from "./dtos/filters.dto"
import StatisticsEntity from "./entities/statistics.entity"
import { StatisticsService } from "./statistics.service"

@ApiTags("statistics")
@Controller("statistics")
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    description: "Statistic entries",
    type: StatisticsEntries
  })
  @Get()
  async get(@Query() filters: StatisticsFilters): Promise<{ entries: StatisticsEntity[] }> {
    return {
      entries: await this.statisticsService.findAll(filters)
    }
  }

  @Post()
  async create(@Body() createInput: CreateStatisticsEntry) {
    await this.statisticsService.create(createInput)
  }

  @Delete()
  async reset() {
    await this.statisticsService.clear()
  }
}
