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
   * "2022-08-04"
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
  views: number
  /**
   * number of clicks
   */
  @Column({ default: 0 })
  @IsNumber()
  clicks: number
  /**
   * cost of clicks
   */
  @Column({ default: 0, type: "float" })
  @IsNumber()
  cost: number
  /**
   * cost / clicks(average cost per click)
   */
  @Expose()
  @IsNumber()
  @Transform(transformNumber({ default: 0 }))
  get cpc(): number {
    return this.cost / this.clicks
  }
  /**
   * cost / views * 1000 (average cost per 1000 impressions)
   */
  @Expose()
  @IsNumber()
  @Transform(transformNumber({ default: 0 }))
  get cpm(): number {
    return (this.cost / this.views) * 1000
  }

  constructor(partial: Partial<StatisticsEntity>) {
    Object.assign(this, partial)
  }
}

export default StatisticsEntity
