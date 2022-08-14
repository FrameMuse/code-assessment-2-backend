import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { CreateInput } from "./dtos/create.dto"
import StatisticsFiltersDto from "./dtos/filters.dto"
import StatisticsEntity from "./entities/statistics.entity"

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(StatisticsEntity)
    private readonly repository: Repository<StatisticsEntity>
  ) {}

  async findAll(filters: StatisticsFiltersDto): Promise<StatisticsEntity[]> {
    const entries = await this.repository.find()

    if (filters.from == null && filters.to == null) {
      return entries
    }

    return entries.filter((entry) => {
      if (entry.date.getTime() >= filters.from?.getTime()) {
        return true
      }

      if (entry.date.getTime() <= filters.to?.getTime()) {
        return true
      }

      return false
    })
  }

  create(createInput: CreateInput): void {
    this.repository.save(createInput)
  }

  clear(): void {
    this.repository.clear()
  }
}
