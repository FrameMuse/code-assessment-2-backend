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

import { CreateInput } from "./dtos/create.dto"
import StatisticsFiltersDto from "./dtos/filters.dto"
import StatisticsEntity from "./entities/statistics.entity"
import { StatisticsService } from "./statistics.service"

@Controller("statistics")
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async get(@Query() filters: StatisticsFiltersDto): Promise<StatisticsEntity[]> {
    return await this.statisticsService.findAll(filters)
  }

  @Post()
  async create(@Body() createInput: CreateInput) {
    await this.statisticsService.create(createInput)
  }

  @Delete()
  async reset() {
    await this.statisticsService.clear()
  }
}
