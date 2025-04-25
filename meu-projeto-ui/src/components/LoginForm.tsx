"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

interface FormState {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

export default function LoginForm() {
  const router = useRouter()
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Limpar erro quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name as keyof FormState)
  }

  const validateField = (fieldName: keyof FormState) => {
    const newErrors: FormErrors = { ...errors }

    switch (fieldName) {
      case "email":
        if (!formState.email) {
          newErrors.email = "E-mail é obrigatório"
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
          newErrors.email = "E-mail inválido"
        } else {
          delete newErrors.email
        }
        break
      case "password":
        if (!formState.password) {
          newErrors.password = "Senha é obrigatória"
        } else if (formState.password.length < 6) {
          newErrors.password = "A senha deve ter pelo menos 6 caracteres"
        } else {
          delete newErrors.password
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateForm = () => {
    const emailValid = validateField("email")
    const passwordValid = validateField("password")
    return emailValid && passwordValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Marcar todos os campos como tocados para mostrar erros
    setTouched({
      email: true,
      password: true,
    })

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Simulação de login - substitua por sua lógica real de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Exemplo de verificação de credenciais
      // Na implementação real, isso seria feito no servidor
      if (formState.email === "erro@exemplo.com") {
        throw new Error("Credenciais inválidas")
      }

      // Login bem-sucedido
      setLoginSuccess(true)

      // Redirecionar após login bem-sucedido
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Ocorreu um erro ao fazer login",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-white to-gray-100">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-[#fe5000]/5 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 "></div>
        <div className="absolute bottom-0 left-0 bg-[#fe5000]/5 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 "></div>

        {/* Padrão de pontos decorativos - visível apenas em telas maiores */}
        <div className="hidden lg:block absolute top-20 left-20">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#fe5000]/20"></div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-20 right-20">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#fe5000]/20"></div>
            ))}
          </div>
        </div>

        {/* Linhas decorativas - visíveis apenas em telas maiores */}
        <div className="hidden lg:block absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#fe5000]/20 to-transparent"></div>
        <div className="hidden lg:block absolute top-0 right-1/4 w-px h-48 bg-gradient-to-b from-transparent via-[#fe5000]/20 to-transparent"></div>
        <div className="hidden lg:block absolute bottom-0 left-1/3 w-px h-48 bg-gradient-to-t from-transparent via-[#fe5000]/20 to-transparent"></div>
        <div className="hidden lg:block absolute bottom-0 right-1/3 w-px h-32 bg-gradient-to-t from-transparent via-[#fe5000]/20 to-transparent"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="w-full max-w-md z-10 px-4">
        <div className="mb-6">
          <Header />
        </div>

        <Card className="w-full bg-white/90 shadow-xl border border-gray-100 border-t-4 border-t-[#fe5000]">
          <CardHeader className="pb-2">
            <h1 className="text-2xl font-bold text-center">Acesse sua conta</h1>
            <p className="text-sm text-muted-foreground text-center mt-1">
              Entre com suas credenciais para acessar o sistema
            </p>
          </CardHeader>

          <CardContent>
            {errors.general && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {loginSuccess && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700">
                  Login realizado com sucesso! Redirecionando...
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={formState.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading || loginSuccess}
                  className={`${touched.email && errors.email ? "border-red-500 focus-visible:ring-red-500" : ""} bg-white`}
                  aria-invalid={!!(touched.email && errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {touched.email && errors.email && (
                  <p id="email-error" className="text-xs text-red-500 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Senha<span className="text-red-500">*</span>
                  </Label>
                  <Link href="/esqueceu-senha" className="text-xs text-[#fe5000] hover:underline" tabIndex={0}>
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={formState.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading || loginSuccess}
                    className={`${
                      touched.password && errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                    } pr-10 bg-white`}
                    aria-invalid={!!(touched.password && errors.password)}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    tabIndex={0}
                    disabled={isLoading || loginSuccess}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p id="password-error" className="text-xs text-red-500 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#fe5000] hover:bg-[#e04600] text-white h-11 mt-6"
                disabled={isLoading || loginSuccess}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : loginSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Conectado
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-[#fe5000] font-medium hover:underline">
                Criar conta
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  )
}
