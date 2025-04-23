'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from "next/link"
import { Lato } from "next/font/google"
import Header from '@/components/Header'

const latoBoldItalic = Lato({
    weight: '700',
    style: 'italic',
    subsets: ['latin'],
  });

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div className="p-5">
      <Header />
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
        <Link href="/esqueceu-senha" className="text-sm hover:underline">Esqueceu a senha?</Link>
        
          <Link href="/cadastro" className="hover:underline text-[#fe5000]">Criar conta</Link>
        </div>

        <Button type="submit" className="w-full mt-4 bg-[#fe5000] text-white">Entrar</Button>
      </form>
    </div>
  )
}