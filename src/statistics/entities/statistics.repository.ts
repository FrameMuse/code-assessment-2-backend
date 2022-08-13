import { InMemoryDBService } from "@nestjs-addons/in-memory-db"

import StatisticsEntity from "./statistics.entity"

export class StatisticsRepository extends InMemoryDBService<StatisticsEntity> {}
