import { Test, TestingModule } from "@nestjs/testing"
// _
import { InMemoryDBModule } from "@nestjs-addons/in-memory-db"

import { StatisticsController } from "./statistics.controller"
import { StatisticsModule } from "./statistics.module"

describe("StatisticsController", () => {
  let controller: StatisticsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDBModule.forRoot({}), StatisticsModule]
    }).compile()

    controller = module.get<StatisticsController>(StatisticsController)
  })

  describe("Methods", () => {
    it(`should return empty array"`, () => {
      expect(controller.get()).toEqual([])
    })
  })
})
