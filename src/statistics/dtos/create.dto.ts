import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { transformDate, transformNumber } from "src/common/helpers/transform.helpers"

export class CreateInput {
  @IsNotEmpty()
  @IsDate()
  @Transform(transformDate)
  date: Date

  @IsNumber()
  @IsOptional()
  @Transform(transformNumber({ min: 0 }))
  views: number

  @IsNumber()
  @IsOptional()
  @Transform(transformNumber({ min: 0 }))
  clicks: number

  @IsNumber()
  @IsOptional()
  @Transform(transformNumber({ default: 0, fixed: 2 }))
  cost: number
}
