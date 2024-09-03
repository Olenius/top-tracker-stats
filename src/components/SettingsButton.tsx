import { Cog6ToothIcon } from "@heroicons/react/24/solid"

const openOptions = () =>
  chrome.tabs.create({
    url: "./options.html"
  })

export const SettingsButton = ({
  onlyIcon = false
}: {
  onlyIcon?: boolean
}) => (
  <button
    className={`inline-flex gap-1 items-center cursor-pointer font-bold p-2 hover:bg-gray-200 rounded-full ${!onlyIcon ? "px-4" : ""}`}
    onClick={openOptions}
    title="Settings">
    <Cog6ToothIcon className="size-4" />
    {!onlyIcon ? "Open Settings" : null}
  </button>
)
