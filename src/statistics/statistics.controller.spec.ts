import { Test, TestingModule } from "@nestjs/testing"

import { StatisticsController } from "./statistics.controller"
import { StatisticsModule } from "./statistics.module"

describe("StatisticsController", () => {
  let controller: StatisticsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StatisticsModule]
    }).compile()

    controller = module.get<StatisticsController>(StatisticsController)
  })

  describe("Methods", () => {
    it(`should return empty array"`, () => {
      expect(controller.get({})).toEqual([])
    })
  })
})
