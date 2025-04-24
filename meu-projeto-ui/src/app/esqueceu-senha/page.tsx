"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Header from "@/components/Header"

export default function EsqueceuSenha() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Link de redefinição enviado para " + email)
    setEmail("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <Header />

        <h2 className="text-2xl sm:text-3xl font-semibold text-center mt-6 mb-8">
          Recuperar senha
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              E-mail cadastrado
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-[#fe5000] text-white">
            Enviar link de recuperação
          </Button>
        </form>
      </div>
    </div>
  )
}
