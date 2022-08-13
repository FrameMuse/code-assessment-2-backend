import { Transform } from "class-transformer"
import { IsDate, IsOptional } from "class-validator"
import { transformDate } from "src/common/helpers/transform.helpers"

class StatisticsFiltersDto {
  /** Start period date (Inclusive). Format: YYYY-MM-DD */
  @IsDate()
  @IsOptional()
  @Transform(transformDate)
  from?: Date
  /** End period date (Inclusive). Format: YYYY-MM-DD */
  @IsDate()
  @IsOptional()
  @Transform(transformDate)
  to?: Date

  constructor(partial?: Partial<StatisticsFiltersDto>) {
    Object.assign(this, partial)
  }
}

export default StatisticsFiltersDto
