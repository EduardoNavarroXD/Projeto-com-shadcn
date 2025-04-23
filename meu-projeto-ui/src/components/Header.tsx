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
    <div className="flex items- gap-4 cursor-pointer" onClick={handleVoltar}>
      <Image
        src="https://app.fiancarapida.com/logo.svg"
        alt="Logo"
        width={60}
        height={60}
        className="object-contain"
        unoptimized
      />
      <span
        className={`${latoBoldItalic.className} text-5xl font-bold italic text-[#fe5000] whitespace-nowrap`}
      >
        Fiança Rápida
      </span>
    </div>
  )
}