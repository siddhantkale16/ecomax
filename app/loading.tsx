export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full bg-zinc-950">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
        <div className="w-16 h-16 border-4 border-zinc-900 border-t-primary rounded-full animate-spin relative z-10 shadow-indigo-glow"></div>
      </div>
    </div>
  )
}