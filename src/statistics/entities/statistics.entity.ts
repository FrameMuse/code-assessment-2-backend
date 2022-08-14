import { Exclude, Expose, Transform } from "class-transformer"
import { IsDate, IsNumber } from "class-validator"
import { transformDate, transformNumber } from "src/common/helpers/transform.helpers"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class StatisticsEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number

  /**
   * event date in YYYY-MM-DD format.
   *
   * @example
   * "2022.08.04"
   */
  @Column()
  @IsDate()
  @Transform(transformDate)
  date: Date
  /**
   * number of impressions
   */
  @Column({ default: 0 })
  @IsNumber()
  @Transform(transformNumber({ default: 0 }))
  views: number
  /**
   * number of clicks
   */
  @Column({ default: 0 })
  @IsNumber()
  @Transform(transformNumber({ default: 0 }))
  clicks: number
  /**
   * cost of clicks
   */
  @Column({ default: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Transform(transformNumber({ default: 0 }))
  cost: number
  /**
   * cost / clicks(average cost per click)
   */
  @Expose()
  get cpc(): number {
    return this.cost / this.clicks
  }
  /**
   * cost / views * 1000 (average cost per 1000 impressions)
   */
  @Expose()
  get cpm(): number {
    return (this.cost / this.views) * 1000
  }
}

export default StatisticsEntity
