"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { ArrowLeft, UserRound, Building2 } from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"

export default function TipoCadastro({ onSelect }: { onSelect: (tipo: string) => void }) {
  const router = useRouter()
  const handleVoltar = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 bg-gray">
      <div className="w-full max-w-xl">
        <div className="mb-6">
          <Header />
        </div>

        <Card className="w-full shadow-md border border-gray-100 border-t-4 border-t-[#fe5000] bg-white">
          <CardHeader className="pb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoltar}
              className="w-fit flex items-center text-gray-500 hover:text-[#fe5000] mb-2 -ml-2"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para login
            </Button>
            <h2 className="text-2xl font-bold text-center">Cadastro de Parceiro</h2>
            <p className="text-sm text-muted-foreground text-center mt-1">
              Selecione o tipo de cadastro que deseja realizar
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-sm">
              <p className="mb-2">
                Para se cadastrar como um parceiro <span className="font-semibold text-[#fe5000]">Pessoa Física</span>,
                selecione a opção <span className="font-semibold text-[#fe5000]">Assessor Autônomo</span>.
              </p>
              <p>
                Para se cadastrar como um parceiro <span className="font-semibold text-[#fe5000]">Pessoa Jurídica</span>
                , selecione a opção <span className="font-semibold text-[#fe5000]">Escritório Associado</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => onSelect("assessor")}
                className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#fe5000] hover:bg-orange-50 transition-all duration-200 group"
              >
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-[#fe5000]/20 transition-colors">
                  <UserRound className="h-8 w-8 text-[#fe5000]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#fe5000]">Assessor Autônomo</h3>
                <p className="text-sm text-gray-500 text-center mt-2">Para cadastro de pessoa física</p>
              </button>

              <button
                onClick={() => onSelect("escritorio")}
                className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#fe5000] hover:bg-orange-50 transition-all duration-200 group"
              >
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-[#fe5000]/20 transition-colors">
                  <Building2 className="h-8 w-8 text-[#fe5000]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#fe5000]">Escritório Associado</h3>
                <p className="text-sm text-gray-500 text-center mt-2">Para cadastro de pessoa jurídica</p>
              </button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Já possui uma conta?{" "}
              <Link href="/login" className="text-[#fe5000] font-medium hover:underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  )
}
