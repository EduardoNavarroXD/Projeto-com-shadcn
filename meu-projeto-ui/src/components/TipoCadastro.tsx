"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Lato } from "next/font/google"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { ArrowLeft, UserRound, Building2 } from "lucide-react"
import Link from "next/link"

const latoBoldItalic = Lato({
  weight: "700",
  style: "italic",
  subsets: ["latin"],
})

export default function TipoCadastro({ onSelect }: { onSelect: (tipo: string) => void }) {
  const router = useRouter()
  const handleVoltar = () => {
    router.push("/login")
  }

  return (
    <div className="max-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-white to-gray-100">
      {/* Elementos decorativos - iguais aos da tela de login */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-[#fe5000]/5 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 "></div>
        <div className="absolute bottom-0 left-0 bg-[#fe5000]/5 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 "></div>

        {/* Padrão de pontos decorativos - visível apenas em telas maiores */}
        <div className="hidden lg:block absolute top-20 left-20">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#fe5000]/20"></div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-20 right-20">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#fe5000]/20"></div>
            ))}
          </div>
        </div>

        {/* Linhas decorativas - visíveis apenas em telas maiores */}
        <div className="hidden lg:block absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#fe5000]/20 to-transparent"></div>
        <div className="hidden lg:block absolute top-0 right-1/4 w-px h-48 bg-gradient-to-b from-transparent via-[#fe5000]/20 to-transparent"></div>
        <div className="hidden lg:block absolute bottom-0 left-1/3 w-px h-48 bg-gradient-to-t from-transparent via-[#fe5000]/20 to-transparent"></div>
        <div className="hidden lg:block absolute bottom-0 right-1/3 w-px h-32 bg-gradient-to-t from-transparent via-[#fe5000]/20 to-transparent"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="w-full max-w-xl z-10 px-4">
        {/* Logo e título */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 min-w-0 cursor-pointer transition">
          <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 relative">
            <Image src="https://app.fiancarapida.com/logo.svg" alt="Logo" fill className="object-contain" unoptimized />
          </div>
          <h1
            className={`${latoBoldItalic.className} 
              font-bold italic text-[#fe5000] whitespace-nowrap
              text-[clamp(1.25rem,5vw,2rem)]
              flex-shrink`}
          >
            Fiança Rápida
          </h1>
        </div>

        {/* Card principal */}
        <Card className="w-full bg-white/90 shadow-xl border border-gray-100 border-t-4 border-t-[#fe5000]">
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
