import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsDate, IsOptional } from "class-validator"
import { transformDate } from "src/common/helpers/transform.helpers"

class StatisticsFilters {
  /** Start period date (Inclusive). Format: YYYY-MM-DD */
  @ApiPropertyOptional({ format: "date" })
  @IsDate()
  @IsOptional()
  @Transform(transformDate)
  from?: Date
  /** End period date (Inclusive). Format: YYYY-MM-DD */
  @ApiPropertyOptional({ format: "date" })
  @IsDate()
  @IsOptional()
  @Transform(transformDate)
  to?: Date

  constructor(partial?: Partial<StatisticsFilters>) {
    Object.assign(this, partial)
  }
}

export default StatisticsFilters
