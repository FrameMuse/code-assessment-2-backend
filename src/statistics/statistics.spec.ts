/**
 * Inspiration:
 * https://docs.nestjs.com/fundamentals/testing#end-to-end-testing
 * https://stackoverflow.com/questions/59355841/how-to-apply-global-pipes-during-e2e-tests
 */

import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "src/app.module"
import * as request from "supertest"

describe("StatisticsController", () => {
  let app: INestApplication

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

    await app.init()
    // Clear statistics before start test
    await request(app.getHttpServer()).delete("/statistics")
  })

  describe("Methods", () => {
    const testCreateInput = {
      clicks: -1,
      cost: 2.2002,
      date: "2002-12-20",
      views: 1
    }
    const testEntity = {
      clicks: 0,
      cost: 2.2,
      date: "2002-12-20",
      views: 1,
      cpc: 0,
      cpm: 2200
    }

    function createEntity() {
      return request(app.getHttpServer()).post("/statistics").send(testCreateInput)
    }

    it(`GET /statistics should return empty array`, () => {
      return request(app.getHttpServer()).get("/statistics").expect(200).expect([])
    })

    it(`GET /statistics should filter by "from" or "to" (inclusive) with past date`, async () => {
      await createEntity()

      const responseFROM = await request(app.getHttpServer())
        .get("/statistics")
        .query({ from: "2002-10-20" })
      expect(responseFROM.status).toBe(200)
      expect(responseFROM.body).toEqual([testEntity])

      const responseTO = await request(app.getHttpServer())
        .get("/statistics")
        .query({ to: "2002-10-20" })
      expect(responseTO.status).toBe(200)
      expect(responseTO.body).toEqual([])
    })

    it(`GET /statistics should filter by "from" or "to" (inclusive) with the same date`, async () => {
      await createEntity()

      const responseFROM = await request(app.getHttpServer())
        .get("/statistics")
        .query({ from: "2002-12-20" })
      expect(responseFROM.status).toBe(200)
      expect(responseFROM.body).toEqual([testEntity])

      const responseTO = await request(app.getHttpServer())
        .get("/statistics")
        .query({ to: "2002-12-20" })
      expect(responseTO.status).toBe(200)
      expect(responseTO.body).toEqual([testEntity])
    })

    it(`GET /statistics should filter by "from" or "to" (inclusive) with future date`, async () => {
      await createEntity()

      const responseFROM = await request(app.getHttpServer())
        .get("/statistics")
        .query({ from: "2012-12-20" })
      expect(responseFROM.status).toBe(200)
      expect(responseFROM.body).toEqual([])

      const responseTO = await request(app.getHttpServer())
        .get("/statistics")
        .query({ to: "2012-12-20" })
      expect(responseTO.status).toBe(200)
      expect(responseTO.body).toEqual([testEntity])
    })

    it(`GET /statistics should filter by "from" and "to" (inclusive) with past date`, async () => {
      await createEntity()

      return request(app.getHttpServer())
        .get("/statistics")
        .query({ to: "2001-12-20", from: "2001-12-20" })
        .expect(200)
        .expect([])
    })

    it(`GET /statistics should filter by "from" and "to" (inclusive) with the same date`, async () => {
      await createEntity()

      return request(app.getHttpServer())
        .get("/statistics")
        .query({ to: "2002-12-20", from: "2002-12-20" })
        .expect(200)
        .expect([testEntity])
    })

    it(`GET /statistics should filter by "from" and "to" (inclusive) with future date`, async () => {
      await createEntity()

      return request(app.getHttpServer())
        .get("/statistics")
        .query({ to: "2012-12-20", from: "2012-12-20" })
        .expect(200)
        .expect([])
    })

    it(`GET /statistics should filter by "from" and "to" (inclusive)`, async () => {
      await createEntity()

      return request(app.getHttpServer())
        .get("/statistics")
        .query({ to: "2012-12-20", from: "2000-12-20" })
        .expect(200)
        .expect([testEntity])
    })

    it(`POST /statistics should create new record"`, async () => {
      return request(app.getHttpServer())
        .post("/statistics")
        .send(testCreateInput)
        .expect(201)
        .expect("")
    })

    it(`DELETE /statistics should return void"`, async () => {
      return request(app.getHttpServer()).delete("/statistics").expect(200).expect("")
    })

    it(`DELETE /statistics should reset its entity"`, async () => {
      await request(app.getHttpServer()).post("/statistics").send(testCreateInput)

      const getResponse1 = await request(app.getHttpServer()).get("/statistics")
      expect(getResponse1.status).toBe(200)
      expect(getResponse1.body).toEqual([testEntity])

      await request(app.getHttpServer()).delete("/statistics")

      const getResponse2 = await request(app.getHttpServer()).get("/statistics")
      expect(getResponse2.status).toBe(200)
      expect(getResponse2.body).toEqual([])
    })
  })

  afterAll(async () => {
    // Clear statistics after tests to have clean db
    await request(app.getHttpServer()).delete("/statistics")
    await app.close()
  })
})
