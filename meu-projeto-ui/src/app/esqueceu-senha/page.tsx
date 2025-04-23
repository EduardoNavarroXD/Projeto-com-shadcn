"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"

export default function EsqueceuSenha() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Enviando recuperação para:", email)
    alert("Link de redefinição enviado para " + email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
  <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
    <Header />

    <h2 className="text-2xl sm:text-3xl font-semibold text-center mt-6 mb-8">
      Recuperar senha
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
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

      <Button type="submit" className="w-full bg-[#fe5000] text-white py-2 px-6 rounded-lg">
        Enviar link de recuperação
      </Button>
    </form>
  </div>
</div>
  )
}
