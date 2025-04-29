import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileQuestion className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Página não encontrada</h2>
        <p className="text-gray-600 mb-6">A página que você está procurando não existe ou foi movida.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-[#fe5000] hover:bg-[#e04600]">
            <Link href="/dashboard">Ir para o Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Voltar para o início</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
