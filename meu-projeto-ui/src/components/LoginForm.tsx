'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from "next/link"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
      <h1 className="text-[48px] font-bold text-[#fe5000]" style={{ fontFamily: 'Lato, sans-serif', whiteSpace: 'nowrap' }}>Fiança Rápida</h1>
      <Image
        src="https://app.fiancarapida.com/logo.svg"
        alt="Logo"
        width={110}
        height={30}
        className="object-contain max-w-[150px] h-auto"
        unoptimized
      />
      </div>

      <h2 className="text-xl font-medium mb-4">Fazer login na conta</h2>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
            E-mail*
          </label>
          <Input id="email" placeholder="Digite seu e-mail" required className="w-full" />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
            Senha*
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              required
              className="w-full pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <div className="flex justify-between text-sm text-blue-600">
          <a href="#" className="hover:underline">Esqueceu sua senha?</a>
          <Link href="/cadastro" className="hover:underline">Criar conta</Link>
        </div>

        <Button type="submit" className="w-full mt-4 bg-[#fe5000] text-white">Entrar</Button>
      </form>
    </div>
  )
}