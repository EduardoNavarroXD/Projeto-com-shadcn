"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lato } from "next/font/google"

const latoBoldItalic = Lato({
  weight: "700",
  style: "italic",
  subsets: ["latin"],
})

export default function Header() {
  const router = useRouter()

  const handleVoltar = () => {
    router.push("/login")
  }

  return (
    <div
      className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5 min-w-0 cursor-pointer transition-transform hover:scale-105 w-full max-w-screen-xl mx-auto py-3 sm:py-4"
      onClick={handleVoltar}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleVoltar()}
      aria-label="Voltar para a página de login"
    >
      <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 relative">
        <Image
          src="https://app.fiancarapida.com/logo.svg"
          alt="Logo Fiança Rápida"
          fill
          className="object-contain"
          unoptimized
          priority
        />
      </div>
      <h1
        className={`${latoBoldItalic.className} font-bold italic text-[#fe5000] text-[clamp(1.5rem,6vw,2.5rem)] whitespace-nowrap overflow-hidden text-ellipsis flex-shrink`}
      >
        Fiança Rápida
      </h1>
    </div>
  )
}
