import { useStorage } from "@plasmohq/storage/dist/hook"

import { ProgressBar } from "~/components/ProgressBar"
import { useTopTrackerData } from "~/data/useTopTrackerData"
import { utils } from "~/utils"
import { SettingsButton } from "~components/SettingsButton"

export function StatsPage() {
  const [token] = useStorage<string>("token")
  const [project] = useStorage<string>("project")
  const [worker] = useStorage<string>("worker")
  const [startWorkHour] = useStorage<number>("start_work_hour", 10)
  const [endWorkHour] = useStorage<number>("end_work_hour", 18)
  const [hoursPerDay] = useStorage<number>("hours_per_day", 8)
  const [workDays] = useStorage<number>("work_days", 5)

  const { data, isLoading, isError } = useTopTrackerData(token, project, worker)

  if (!token || !project || !worker) {
    return (
      <div className="flex-1 flex flex-col gap-2 items-center justify-center text-center">
        <p>
          Please add your <code>token</code>, <code>project id</code> and{" "}
          <code>worker id</code>
        </p>
        <SettingsButton />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-center">
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center text-center">
        Error fetching data
      </div>
    )
  }

  const { statistics, engagements, dayStats } = data

  const todayProgress =
    (dayStats.reports.workers.data[0].dates[0].seconds / 3600 / hoursPerDay) *
    100
  const weekProgress =
    (statistics.outstanding_amount /
      (engagements.workers[0].rate * hoursPerDay * workDays)) *
    100

  return (
    <div className="flex-1">
      <div className="space-y-4 pb-4">
        <div>
          <h4 className="font-bold text-green-600 mb-1">Outstanding</h4>
          <p className="m-0 text-lg">
            <span className="blur-sm hover:blur-none">
              ${statistics.outstanding_amount.toFixed(2)}
            </span>
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
