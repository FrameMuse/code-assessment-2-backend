import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsArray } from "class-validator"

import StatisticsEntity from "../entities/statistics.entity"

class StatisticsEntries {
  @ApiProperty({ isArray: true, type: StatisticsEntity })
  @Expose()
  @IsArray()
  entries: StatisticsEntity[]
}

export default StatisticsEntries
