import {
  Logger,
  LoggerFileHandler,
  LoggerNodeHandler,
  LogLevel,
  toPath,
} from "zeed"
import { serve, useHttp, on } from "zerva"

Logger.setHandlers([
  LoggerFileHandler(toPath("data/zerva.log"), {
    level: LogLevel.debug,
  }),
  LoggerNodeHandler({
    level: LogLevel.info,
    filter: "*",
    colors: true,
    padding: 32,
    nameBrackets: false,
    levelHelper: false,
  }),
])

const log = Logger("service")

serve(async () => {
  useHttp({
    port: 8080,
  })

  on("httpInit", ({ get }) => {
    const started = new Date().toISOString()
    log.info(`Service started at ${started}`)

    get("/", () => {
      return `Running since ${started}.`
    })
  })

  // Example for repeating tasks - Cron like

  // https://www.npmjs.com/package/cron
  // https://blog.abelotech.com/posts/nodejs-scheduler-cron-timeout-interval/#explanation-of-a-cron-expression

  // const job = new CronJob(
  //   // "*/10 * * * * 0-6", // each 10 secs
  //   "0 0 * * 0-6", // midnight
  //   function () {
  //     log.info("Midnight update triggered", new Date())
  //   },
  //   null,
  //   true,
  //   "Europe/Berlin"
  // )
  //
  // log.info(
  //   `Next 10 scheduled jobs:\n${(job.nextDates(10) as any[])
  //     .map((date: any) => date.toString())
  //     .join("\n")}`
  // )
})
