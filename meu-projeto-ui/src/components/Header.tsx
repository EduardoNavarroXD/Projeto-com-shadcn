"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lato } from "next/font/google"

const latoBoldItalic = Lato({
  weight: '700',
  style: 'italic',
  subsets: ['latin'],
})

export default function Header() {
  const router = useRouter()

  const handleVoltar = () => {
    router.push('/login')
  }

  return (
    <div
      className="flex items-center gap-2 sm:gap-4 min-w-0 cursor-pointer"
      onClick={handleVoltar}
    >
      <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 relative">
        <Image
          src="https://app.fiancarapida.com/logo.svg"
          alt="Logo"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <span
        className={`${latoBoldItalic.className} font-bold italic text-[#fe5000] text-[clamp(1rem,6vw,2rem)] whitespace-nowrap overflow-hidden text-ellipsis min-w-0`}
      >
        Fiança Rápida
      </span>
    </div>
  )
}
