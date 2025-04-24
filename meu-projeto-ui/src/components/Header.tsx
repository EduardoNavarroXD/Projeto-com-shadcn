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
      className="flex items-center gap-3 sm:gap-4 cursor-pointer flex-wrap justify-center sm:justify-start"
      onClick={handleVoltar}
    >
      <Image
        src="https://app.fiancarapida.com/logo.svg"
        alt="Logo"
        width={50}
        height={50}
        className="object-contain"
        unoptimized
      />
      <span
        className={`${latoBoldItalic.className} text-3xl sm:text-4xl md:text-5xl font-bold italic text-[#fe5000] text-center sm:text-left`}
      >
        Fiança Rápida
      </span>
    </div>
  )
}
