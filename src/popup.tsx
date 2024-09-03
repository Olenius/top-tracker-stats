import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"

import { Storage } from "@plasmohq/storage"

import ErrorBoundary from "~/components/ErrorBoundary"
import { StatsPage } from "~/components/StatsPage"
import { createPlasmoPersister } from "~/data/plasmoPersister"

import "./globals.css"

const storage = new Storage()
export const persister = createPlasmoPersister(storage)
export const queryClient = new QueryClient()

export default function IndexPopup() {
  return (
    <div className="w-[350px] p-4">
      <ErrorBoundary
        fallback={
          <div className="text-center">
            Something went wrong. Please try again later.
          </div>
        }>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}>
          <StatsPage />
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </div>
  )
}
