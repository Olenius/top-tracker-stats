import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/dist/hook"

import ErrorBoundary from "~/components/ErrorBoundary"
import { StatsPage } from "~/components/StatsPage"
import { createPlasmoPersister } from "~/data/plasmoPersister"
import { ErrorFallback } from "~components/ErrorFallback"
import { Header } from "~components/Header"
import { useTopTrackerData } from "~data/useTopTrackerData"

import "~/globals.css"

const storage = new Storage()
export const persister = createPlasmoPersister(storage)
export const queryClient = new QueryClient()

const IndexPopupContent = () => {
  const [token] = useStorage<string>("token")
  const [project] = useStorage<string>("project")
  const [worker] = useStorage<string>("worker")

  const { refetch, isRefetching } = useTopTrackerData(token, project, worker)

  return (
    <>
      <Header refetch={refetch} isRefetching={isRefetching} />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <StatsPage />
      </ErrorBoundary>
    </>
  )
}

export default function IndexPopup() {
  return (
    <div className="w-[350px] flex flex-col min-h-48 p-4">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}>
          <IndexPopupContent />
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </div>
  )
}
