import type React from "react"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import PageTransition from "@/components/PageTransition"

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Dashboard | Fiança Rápida",
  description: "Painel de controle da Fiança Rápida",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTransition variant="fade" duration={0.3}>
      <div className={lato.className}>{children}</div>
    </PageTransition>
  )
}
