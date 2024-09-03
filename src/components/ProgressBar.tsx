export function ProgressBar({ red, blue }: { red: number; blue: number }) {
  return (
    <div className="relative h-6 bg-[#b2bec3] rounded-xl overflow-hidden">
      <div
        className="absolute h-full bg-[#74b9ff] rounded-xl"
        style={{
          width: `${red}%`
        }}></div>
      <div
        className="absolute h-full bg-[#0984e3] rounded-xl"
        style={{ width: `${blue}%` }}></div>
      <span className="w-full absolute left-0 right-0 top-0 bottom-0 text-white font-bold flex items-center justify-center">
        {blue.toFixed(2)}%
      </span>
    </div>
  )
}
