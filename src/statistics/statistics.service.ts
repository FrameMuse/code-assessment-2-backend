import { Injectable } from "@nestjs/common"

import { CreateInput } from "./dtos/create.dto"
import StatisticsFiltersDto from "./dtos/filters.dto"
import StatisticsEntity from "./entities/statistics.entity"
import { StatisticsRepository } from "./entities/statistics.repository"

@Injectable()
export class StatisticsService {
  constructor(private podcastRepository: StatisticsRepository) {}

  findAll(filters?: StatisticsFiltersDto): StatisticsEntity[] {
    const entries = this.podcastRepository.getAll()

    if (filters == null) {
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

  create(createInput: CreateInput): { id: string } {
    const podcast = this.podcastRepository.create(createInput)
    return { id: podcast.id }
  }

  reset(): boolean {
    try {
      this.podcastRepository.deleteMany(this.podcastRepository.records.map((record) => record.id))
      return true
    } catch {
      return false
    }
  }
}
