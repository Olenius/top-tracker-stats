import { useQuery } from "@tanstack/react-query"

import { DataFetcher } from "./dataFetcher"

export const useTopTrackerData = (
  token: string,
  project: string,
  worker: string
) => {
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
