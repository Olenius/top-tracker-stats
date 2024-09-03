import type {
  PersistedClient,
  Persister
} from "@tanstack/react-query-persist-client"

import { Storage } from "@plasmohq/storage"

export function createPlasmoPersister(storage: Storage): Persister {
  return {
    persistClient: async (client: PersistedClient) => {
      await storage.set("reactQueryCache", JSON.stringify(client))
    },
    restoreClient: async () => {
      const cacheString = await storage.get("reactQueryCache")
      if (!cacheString) {
        return
      }
      return JSON.parse(cacheString) as PersistedClient
    },
    removeClient: async () => {
      await storage.remove("reactQueryCache")
    }
  }
}
