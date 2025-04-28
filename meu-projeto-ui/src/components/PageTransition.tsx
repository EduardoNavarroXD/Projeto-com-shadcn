"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          y: 20,           // começa 20px mais abaixo
          filter: "blur(4px)",  // começa borrado
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",  // volta ao normal
        }}
        exit={{
          opacity: 0,
          y: -20,         // sai indo para cima
          filter: "blur(4px)",
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut", // transição suave
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
