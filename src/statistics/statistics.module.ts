import { Module } from "@nestjs/common"

import { StatisticsRepository } from "./entities/statistics.repository"
import { StatisticsController } from "./statistics.controller"
import { StatisticsService } from "./statistics.service"

@Module({
  imports: [],
  providers: [StatisticsRepository, StatisticsService],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
