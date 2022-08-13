import { Module } from "@nestjs/common"
// _
import { InMemoryDBModule } from "@nestjs-addons/in-memory-db"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { StatisticsModule } from "./statistics/statistics.module"

@Module({
  imports: [InMemoryDBModule.forRoot({}), StatisticsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
