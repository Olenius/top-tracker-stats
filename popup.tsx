import { ArrowPathIcon } from "@heroicons/react/24/solid"
import { QueryClient, useQuery } from "@tanstack/react-query"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { DataFetcher } from "~dataFetcher"
import ErrorBoundary from "~ErrorBoundary"
import { utils } from "~utils"

import "./globals.css"

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"

import { createPlasmoPersister } from "~plasmoPersister"

const storage = new Storage()
const persister = createPlasmoPersister(storage)

const useTopTrackerData = (token: string, project: string, worker: string) => {
  return useQuery({
    queryKey: ["topTrackerData", token, project, worker],
    queryFn: async () => {
      const statistics = await DataFetcher.fetchStatistics(token, project)
      const engagements = await DataFetcher.fetchEngagements(token, project)
      const dayStats = await DataFetcher.fetchDayStats(token, project, worker)
      return { statistics, engagements, dayStats }
    },
    enabled: !!token && !!project && !!worker,
    refetchInterval: 180000
  })
}

function ProgressBar({ red, blue }: { red: number; blue: number }) {
  return (
    <div className="relative h-6 bg-[#b2bec3] rounded-xl overflow-hidden">
      <div
        className="absolute h-full bg-[#74b9ff] rounded-xl"
        style={{
          width: `${red}%`
        }}></div>
      <div
        className="absolute h-full bg-[#0984e3] rounded-xl"
        style={{ width: `${blue}%` }}></div>
      <span className="w-full absolute left-0 right-0 top-0 bottom-0 text-white font-bold flex items-center justify-center">
        {blue.toFixed(2)}%
      </span>
    </div>
  )
}

function IndexPopup() {
  const [token] = useStorage<string>("token")
  const [project] = useStorage<string>("project")
  const [worker] = useStorage<string>("worker")
  const [startWorkHour] = useStorage<number>("start_work_hour", 10)
  const [endWorkHour] = useStorage<number>("end_work_hour", 18)
  const [hoursPerDay] = useStorage<number>("hours_per_day", 8)
  const [workDays] = useStorage<number>("work_days", 5)

  const { data, refetch, isRefetching, isLoading, isError } = useTopTrackerData(
    token,
    project,
    worker
  )

  if (!token || !project || !worker) {
    return <div className="text-center">Please configure options</div>
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (isError) {
    return <div className="text-center">Error fetching data</div>
  }

  const { statistics, engagements, dayStats } = data

  const todayProgress =
    (dayStats.reports.workers.data[0].dates[0].seconds / 3600 / hoursPerDay) *
    100
  const weekProgress =
    (statistics.outstanding_amount /
      (engagements.workers[0].rate * hoursPerDay * workDays)) *
    100

  console.log({
    todayProgress,
    weekProgress
  })

  return (
    <div>
      <div className="relative flex justify-between">
        <h2 className="text-lg font-bold">TopTracker Stats</h2>
        <button
          className={`cursor-pointer p-2 hover:bg-gray-200 rounded-full ${isRefetching ? "animate-spin" : ""}`}
          onClick={() => refetch()}
          title="Refresh">
          <ArrowPathIcon className="size-4" />
        </button>
      </div>

      <div className="space-y-4 pb-4">
        <div>
          <h4 className="font-bold text-green-600 mb-1">Outstanding</h4>
          <p className="m-0 blur-sm hover:blur-none text-lg">
            ${statistics.outstanding_amount.toFixed(2)}
          </p>
        </div>

        <div>
          <h3 className="flex justify-between mb-1">
            <b>Today</b>
            <span>
              {utils.formatSecondsToHoursAndMinutes(
                dayStats.reports.workers.data[0].dates[0].seconds
              )}
            </span>
          </h3>
          <ProgressBar
            red={utils.getPercentOfDayBar(startWorkHour, endWorkHour)}
            blue={todayProgress}
          />
        </div>

        <div>
          <h3 className="flex justify-between mb-1">
            <b>Week</b>
            <span>
              {utils.formatSecondsToHoursAndMinutes(
                (statistics.outstanding_amount / engagements.workers[0].rate) *
                  3600
              )}
            </span>
          </h3>
          <ProgressBar
            red={utils.getPercentOfWeekBar(workDays)}
            blue={weekProgress}
          />
        </div>
      </div>
    </div>
  )
}

const queryClient = new QueryClient()

export default function () {
  return (
    <div className="w-[350px] p-4">
      <ErrorBoundary
        fallback={<div>Something went wrong. Please try again later.</div>}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}>
          <IndexPopup />
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </div>
  )
}
