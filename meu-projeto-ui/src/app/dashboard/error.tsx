"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Algo deu errado</h2>
        <p className="text-gray-600 mb-6">Ocorreu um erro ao carregar o dashboard. Por favor, tente novamente.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="bg-[#fe5000] hover:bg-[#e04600]">
            Tentar novamente
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Voltar para o início
          </Button>
        </div>
      </div>
    </div>
  )
}
