import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { transformDate, transformNumber } from "src/common/helpers/transform.helpers"

export class CreateStatisticsEntry {
  @ApiProperty({ description: "Format: YYYY-MM-DD" })
  @IsNotEmpty()
  @IsDate()
  @Transform(transformDate)
  date: Date

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Transform(transformNumber({ min: 0 }))
  views: number

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Transform(transformNumber({ min: 0 }))
  clicks: number

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Transform(transformNumber({ default: 0, fixed: 2 }))
  cost: number
}
