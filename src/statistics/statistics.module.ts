import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import StatisticsEntity from "./entities/statistics.entity"
import { StatisticsController } from "./statistics.controller"
import { StatisticsService } from "./statistics.service"

@Module({
  imports: [TypeOrmModule.forFeature([StatisticsEntity])],
  providers: [StatisticsService],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
