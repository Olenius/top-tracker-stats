import { SettingsButton } from "~components/SettingsButton"

export const ErrorFallback = () => (
  <div className="min-h-full flex-1 w-full flex items-center justify-center flex-col gap-2">
    <p className="text-center">
      Something went wrong. Please try again later or check your settings.
    </p>
    <SettingsButton />
  </div>
)
