import { ArrowPathIcon } from "@heroicons/react/24/solid"

import { SettingsButton } from "~components/SettingsButton"

export const Header = ({
  refetch,
  isRefetching
}: {
  refetch: () => void
  isRefetching: boolean
}) => {
  return (
    <div className="relative flex justify-between">
      <h2 className="text-lg font-bold">TopTracker Stats</h2>
      <div className="flex gap-1">
        <SettingsButton onlyIcon />
        <button
          className={`cursor-pointer p-2 hover:bg-gray-200 rounded-full ${isRefetching ? "animate-spin" : ""}`}
          onClick={() => refetch()}
          title="Refresh">
          <ArrowPathIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
