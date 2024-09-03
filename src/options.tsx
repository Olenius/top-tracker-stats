import { useStorage } from "@plasmohq/storage/hook"

import "~/globals.css"

function OptionsIndex() {
  const [token, setToken] = useStorage<string>("token", "")
  const [project, setProject] = useStorage<string>("project", "")
  const [worker, setWorker] = useStorage<string>("worker", "")
  const [startWorkHour, setStartWorkHour] = useStorage<number>(
    "start_work_hour",
    10
  )
  const [endWorkHour, setEndWorkHour] = useStorage<number>("end_work_hour", 18)
  const [hoursPerDay, setHoursPerDay] = useStorage<number>("hours_per_day", 8)
  const [workDays, setWorkDays] = useStorage<number>("work_days", 5)

  return (
    <div className="max-w-2xl mx-auto m-5 p-10 bg-white shadow-md rounded-lg">
      <header className="mb-8 space-y-2">
        <h1 className="text-lg font-bold">TopTracker Stats Settings</h1>
        <p className="text-gray-600">
          Settings are saved automatically. You can close this tab after you
          update the values.
        </p>
      </header>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="input-token"
            className="block text-md font-semibold text-gray-700 mb-1">
            Token
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="input-token"
            onChange={(e) => setToken(e.target.value)}
            value={token}
          />
        </div>

        <div>
          <label
            htmlFor="input-project"
            className="block text-md font-semibold text-gray-700 mb-1">
            Project Id
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="input-project"
            onChange={(e) => setProject(e.target.value)}
            value={project}
          />
        </div>

        <div>
          <label
            htmlFor="input-worker"
            className="block text-md font-semibold text-gray-700 mb-1">
            Worker Id
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="input-worker"
            onChange={(e) => setWorker(e.target.value)}
            value={worker}
          />
        </div>

        <div>
          <label
            htmlFor="input-start-work-hour"
            className="block text-md font-semibold text-gray-700 mb-1">
            Start Work Hour
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="input-start-work-hour"
            type="number"
            min={0}
            max={23}
            onChange={(e) => setStartWorkHour(Number(e.target.value))}
            value={startWorkHour}
          />
        </div>

        <div>
          <label
            htmlFor="input-end-work-hour"
            className="block text-md font-semibold text-gray-700 mb-1">
            End Work Hour
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="input-end-work-hour"
            type="number"
            min={1}
            max={24}
            onChange={(e) => setEndWorkHour(Number(e.target.value))}
            value={endWorkHour}
          />
        </div>

        <div>
          <label
            htmlFor="input-hours-per-day"
            className="block text-md font-semibold text-gray-700 mb-1">
            Hours per Day
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="input-hours-per-day"
            type="number"
            min={1}
            max={24}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            value={hoursPerDay}
          />
        </div>

        <div>
          <label
            htmlFor="input-work-days"
            className="block text-md font-semibold text-gray-700 mb-1">
            Work Days
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="input-work-days"
            type="number"
            min={1}
            max={7}
            onChange={(e) => setWorkDays(Number(e.target.value))}
            value={workDays}
          />
        </div>
      </div>
    </div>
  )
}

export default OptionsIndex
