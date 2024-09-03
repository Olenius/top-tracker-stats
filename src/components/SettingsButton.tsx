import { Cog6ToothIcon } from "@heroicons/react/24/solid"

const openOptions = () =>
  chrome.tabs.create({
    url: "./options.html"
  })

export const OptionsLink = ({ onlyIcon = false }: { full?: boolean }) => (
  <button
    className="inline-flex gap-1 items-center cursor-pointer font-bold py-2 px-4 hover:bg-gray-200 rounded-full"
    onClick={openOptions}
    title="Settings">
    <Cog6ToothIcon className="size-4" />
    {!onlyIcon ? "Settings" : null}
  </button>
)
