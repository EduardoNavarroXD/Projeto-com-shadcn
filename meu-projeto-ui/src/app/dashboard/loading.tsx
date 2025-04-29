import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-[#fe5000] animate-spin" />
        <h2 className="text-xl font-bold text-gray-700">Carregando dashboard...</h2>
        <p className="text-gray-500">Aguarde um momento</p>
      </div>
    </div>
  )
}
