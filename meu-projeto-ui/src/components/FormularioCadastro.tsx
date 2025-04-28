"use client"

import type React from "react"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Header from "@/components/Header"
import { Upload, X, FileText, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Responsavel {
  nome: string
  cpf: string
  telefone: string
  email: string
}

interface FormularioCadastroProps {
  tipo: string
  onVoltar: () => void
}

interface EnderecoViaCep {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export default function FormularioCadastro({ tipo, onVoltar }: FormularioCadastroProps) {

  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    numero: "",
    complemento: "",
  })

  const [dadosPessoais, setDadosPessoais] = useState({
    nomeCompleto: "",
    razaoSocial: "",
    nomeFantasia: "",
    cpf: "",
    cnpj: "",
    creci: "",
    telefone: "",
    email: "",
  })

  const [personalDocs, setPersonalDocs] = useState<File[]>([])
  const [socialContract, setSocialContract] = useState<File[]>([])

  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([{ nome: "", cpf: "", telefone: "", email: "" }])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [cepLoading, setCepLoading] = useState(false)
  const [cepError, setCepError] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)

  const formatadores = {
    cep: (v: string) => v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2"),
    cpf: (v: string) =>
      v
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4"),
    cnpj: (v: string) =>
      v
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2"),
    telefone: (v: string) =>
      v
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2"),
  }

 
  useEffect(() => {
    const buscarCep = async () => {
      if (endereco.cep.length === 9) {
        setCepLoading(true)
        setCepError("")
        try {
          const raw = endereco.cep.replace("-", "")
          const response = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
          const data: EnderecoViaCep = await response.json()

          if (data.erro) {
            setCepError("CEP não encontrado")
            return
          }

          setEndereco((prev) => ({
            ...prev,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf,
          }))
        } catch (error) {
          setCepError("Erro ao buscar CEP")
        } finally {
          setCepLoading(false)
        }
      }
    }

    buscarCep()
  }, [endereco.cep])


  const handleEnderecoChange = (field: keyof typeof endereco, value: string) => {
    setEndereco((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleDadosPessoaisChange = (field: keyof typeof dadosPessoais, value: string) => {
    setDadosPessoais((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleResponsavelChange = (idx: number, field: keyof Responsavel, value: string) => {
    setResponsaveis((prev) => prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r)))
  }

  const addResponsavel = () => {
    setResponsaveis((prev) => [...prev, { nome: "", cpf: "", telefone: "", email: "" }])
  }

  const removeResponsavel = (idx: number) => {
    setResponsaveis((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleFileUpload = (files: File[], setter: React.Dispatch<React.SetStateAction<File[]>>) => {
    setter((prev) => {
      const nomesExistentes = new Set(prev.map((f) => f.name))
      const novosUnicos = Array.from(files).filter((f) => !nomesExistentes.has(f.name))
      return [...prev, ...novosUnicos]
    })
  }

  const removerArquivo = (index: number, setter: React.Dispatch<React.SetStateAction<File[]>>) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  const FileUploadZone = ({
    files,
    setter,
    label,
    required = false,
  }: {
    files: File[]
    setter: React.Dispatch<React.SetStateAction<File[]>>
    label: string
    required?: boolean
  }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const dropZoneRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const dropZone = dropZoneRef.current
      if (!dropZone) return

      const handleDragEnter = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
      }

      const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isDragging) setIsDragging(true)
      }

      const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.currentTarget === dropZone && !dropZone.contains(e.relatedTarget as Node)) {
          setIsDragging(false)
        }
      }

      const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
          handleFileUpload(Array.from(e.dataTransfer.files), setter)
        }
      }


      dropZone.addEventListener("dragenter", handleDragEnter)
      dropZone.addEventListener("dragover", handleDragOver)
      dropZone.addEventListener("dragleave", handleDragLeave)
      dropZone.addEventListener("drop", handleDrop)

      return () => {
        dropZone.removeEventListener("dragenter", handleDragEnter)
        dropZone.removeEventListener("dragover", handleDragOver)
        dropZone.removeEventListener("dragleave", handleDragLeave)
        dropZone.removeEventListener("drop", handleDrop)
      }
    }, [isDragging, setter])

    return (
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
        <div
          ref={dropZoneRef}
          className={`border-2 border-dashed rounded-md p-4 transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : files.length > 0
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-primary"
          }`}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label={`Clique ou arraste arquivos para ${label}`}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Upload className={`h-8 w-8 ${isDragging ? "text-primary" : "text-gray-400"}`} />
            <p className="text-sm font-medium">
              {isDragging ? "Solte os arquivos aqui" : "Clique ou arraste arquivos aqui"}
            </p>
            <p className="text-xs text-muted-foreground">Formatos aceitos: PDF, JPG, PNG</p>
          </div>
          <input
            type="file"
            multiple
            ref={inputRef}
            className="hidden"
            onChange={(e) => {
              if (e.currentTarget.files) {
                handleFileUpload(Array.from(e.currentTarget.files), setter)
              }
            }}
            aria-hidden="true"
          />
        </div>

        {files.length > 0 && (
          <div className="mt-2 space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between rounded-md border p-2 text-sm">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="h-4 w-4 flex-shrink-0 text-gray-500" />
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removerArquivo(index, setter)
                  }}
                  aria-label={`Remover arquivo ${file.name}`}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {}

    // Validar endereço
    if (!endereco.cep) novosErros.cep = "CEP é obrigatório"
    if (!endereco.numero) novosErros.numero = "Número é obrigatório"

    if (tipo === "assessor") {
      if (!dadosPessoais.nomeCompleto) novosErros.nomeCompleto = "Nome é obrigatório"
      if (!dadosPessoais.cpf) novosErros.cpf = "CPF é obrigatório"
    } else {
      if (!dadosPessoais.razaoSocial) novosErros.razaoSocial = "Razão Social é obrigatória"
      if (!dadosPessoais.cnpj) novosErros.cnpj = "CNPJ é obrigatório"
    }

    if (!dadosPessoais.telefone) novosErros.telefone = "Telefone é obrigatório"
    if (!dadosPessoais.email) novosErros.email = "E-mail é obrigatório"

    if (personalDocs.length === 0) novosErros.personalDocs = "Documentos pessoais são obrigatórios"
    if (tipo === "escritorio" && socialContract.length === 0) {
      novosErros.socialContract = "Contrato Social é obrigatório"
    }

    if (tipo === "escritorio") {
      responsaveis.forEach((resp, idx) => {
        if (!resp.nome) novosErros[`responsavel_${idx}_nome`] = "Nome é obrigatório"
        if (!resp.cpf) novosErros[`responsavel_${idx}_cpf`] = "CPF é obrigatório"
        if (!resp.telefone) novosErros[`responsavel_${idx}_telefone`] = "Telefone é obrigatório"
        if (!resp.email) novosErros[`responsavel_${idx}_email`] = "E-mail é obrigatório"
      })
    }

    setErrors(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (!validarFormulario()) {
      toast.error("Por favor, corrija os erros no formulário")
      return
    }

    console.log({
      tipo,
      endereco,
      dadosPessoais,
      responsaveis: tipo === "escritorio" ? responsaveis : [],
      documentos: {
        pessoais: personalDocs,
        contratoSocial: tipo === "escritorio" ? socialContract : [],
      },
    })

    toast.success("Cadastro enviado com sucesso!")

    setEndereco({
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      uf: "",
      numero: "",
      complemento: "",
    })

    setDadosPessoais({
      nomeCompleto: "",
      razaoSocial: "",
      nomeFantasia: "",
      cpf: "",
      cnpj: "",
      creci: "",
      telefone: "",
      email: "",
    })

    setPersonalDocs([])
    setSocialContract([])
    setResponsaveis([{ nome: "", cpf: "", telefone: "", email: "" }])
    setFormSubmitted(false)
  }

  return (
    <div className="container mx-auto py-6 sm:py-10 px-4 max-w-screen-xl">
      <div className="mb-8 w-full">
        <Header />
      </div>

      <Card className="mx-auto max-w-4xl mt-4 sm:mt-6 shadow-lg transition-all duration-300">
        <CardContent className="p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Cadastro de {tipo === "assessor" ? "Assessor" : "Escritório"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold border-b pb-3">Endereço</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="cep" className="flex items-center gap-1 text-sm sm:text-base">
                    CEP<span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="cep"
                      value={endereco.cep}
                      onChange={(e) => handleEnderecoChange("cep", formatadores.cep(e.target.value))}
                      maxLength={9}
                      required
                      className={`${errors.cep ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                      aria-invalid={!!errors.cep}
                      aria-describedby={errors.cep ? "cep-error" : undefined}
                      disabled={cepLoading}
                    />
                    {cepLoading && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      </div>
                    )}
                  </div>
                  {errors.cep && (
                    <p id="cep-error" className="text-xs text-red-500">
                      {errors.cep}
                    </p>
                  )}
                  {cepError && <p className="text-xs text-red-500">{cepError}</p>}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="numero" className="flex items-center gap-1 text-sm sm:text-base">
                    Número<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="numero"
                    value={endereco.numero}
                    onChange={(e) => handleEnderecoChange("numero", e.target.value)}
                    required
                    className={`${errors.numero ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                    aria-invalid={!!errors.numero}
                    aria-describedby={errors.numero ? "numero-error" : undefined}
                  />
                  {errors.numero && (
                    <p id="numero-error" className="text-xs text-red-500">
                      {errors.numero}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="logradouro" className="flex items-center gap-1 text-sm sm:text-base">
                  Logradouro<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="logradouro"
                  value={endereco.logradouro}
                  readOnly
                  className="bg-gray-50 h-9 sm:h-10 text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="complemento" className="text-sm sm:text-base">
                    Complemento
                  </Label>
                  <Input
                    id="complemento"
                    value={endereco.complemento}
                    onChange={(e) => handleEnderecoChange("complemento", e.target.value)}
                    className="h-9 sm:h-10 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="bairro" className="flex items-center gap-1 text-sm sm:text-base">
                    Bairro<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bairro"
                    value={endereco.bairro}
                    readOnly
                    className="bg-gray-50 h-9 sm:h-10 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="cidade" className="flex items-center gap-1 text-sm sm:text-base">
                    Cidade<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cidade"
                    value={endereco.cidade}
                    readOnly
                    className="bg-gray-50 h-9 sm:h-10 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="uf" className="flex items-center gap-1 text-sm sm:text-base">
                    UF<span className="text-red-500">*</span>
                  </Label>
                  <Input id="uf" value={endereco.uf} readOnly className="bg-gray-50 h-9 sm:h-10 text-sm sm:text-base" />
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold border-b pb-3">
                {tipo === "assessor" ? "Dados Pessoais" : "Dados da Empresa"}
              </h2>

              {tipo === "assessor" ? (
                <>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="nomeCompleto" className="flex items-center gap-1 text-sm sm:text-base">
                      Nome Completo<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nomeCompleto"
                      value={dadosPessoais.nomeCompleto}
                      onChange={(e) => handleDadosPessoaisChange("nomeCompleto", e.target.value)}
                      required
                      className={`${errors.nomeCompleto ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                      aria-invalid={!!errors.nomeCompleto}
                      aria-describedby={errors.nomeCompleto ? "nomeCompleto-error" : undefined}
                    />
                    {errors.nomeCompleto && (
                      <p id="nomeCompleto-error" className="text-xs text-red-500">
                        {errors.nomeCompleto}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="cpf" className="flex items-center gap-1 text-sm sm:text-base">
                      CPF<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cpf"
                      value={dadosPessoais.cpf}
                      onChange={(e) => handleDadosPessoaisChange("cpf", formatadores.cpf(e.target.value))}
                      required
                      maxLength={14}
                      className={`${errors.cpf ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                      aria-invalid={!!errors.cpf}
                      aria-describedby={errors.cpf ? "cpf-error" : undefined}
                    />
                    {errors.cpf && (
                      <p id="cpf-error" className="text-xs text-red-500">
                        {errors.cpf}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="razaoSocial" className="flex items-center gap-1 text-sm sm:text-base">
                      Razão Social<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="razaoSocial"
                      value={dadosPessoais.razaoSocial}
                      onChange={(e) => handleDadosPessoaisChange("razaoSocial", e.target.value)}
                      required
                      className={`${errors.razaoSocial ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                      aria-invalid={!!errors.razaoSocial}
                      aria-describedby={errors.razaoSocial ? "razaoSocial-error" : undefined}
                    />
                    {errors.razaoSocial && (
                      <p id="razaoSocial-error" className="text-xs text-red-500">
                        {errors.razaoSocial}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="nomeFantasia" className="text-sm sm:text-base">
                      Nome Fantasia
                    </Label>
                    <Input
                      id="nomeFantasia"
                      value={dadosPessoais.nomeFantasia}
                      onChange={(e) => handleDadosPessoaisChange("nomeFantasia", e.target.value)}
                      className="h-9 sm:h-10 text-sm sm:text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="cnpj" className="flex items-center gap-1 text-sm sm:text-base">
                        CNPJ<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="cnpj"
                        value={dadosPessoais.cnpj}
                        onChange={(e) => handleDadosPessoaisChange("cnpj", formatadores.cnpj(e.target.value))}
                        required
                        maxLength={18}
                        className={`${errors.cnpj ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                        aria-invalid={!!errors.cnpj}
                        aria-describedby={errors.cnpj ? "cnpj-error" : undefined}
                      />
                      {errors.cnpj && (
                        <p id="cnpj-error" className="text-xs text-red-500">
                          {errors.cnpj}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="creci" className="text-sm sm:text-base">
                        CRECI
                      </Label>
                      <Input
                        id="creci"
                        value={dadosPessoais.creci}
                        onChange={(e) => handleDadosPessoaisChange("creci", e.target.value)}
                        className="h-9 sm:h-10 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="telefone" className="flex items-center gap-1 text-sm sm:text-base">
                    Telefone<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="telefone"
                    value={dadosPessoais.telefone}
                    onChange={(e) => handleDadosPessoaisChange("telefone", formatadores.telefone(e.target.value))}
                    required
                    maxLength={15}
                    className={`${errors.telefone ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                    aria-invalid={!!errors.telefone}
                    aria-describedby={errors.telefone ? "telefone-error" : undefined}
                  />
                  {errors.telefone && (
                    <p id="telefone-error" className="text-xs text-red-500">
                      {errors.telefone}
                    </p>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1 text-sm sm:text-base">
                    E-mail<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={dadosPessoais.email}
                    onChange={(e) => handleDadosPessoaisChange("email", e.target.value)}
                    required
                    className={`${errors.email ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {tipo === "escritorio" && (
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-lg font-semibold border-b pb-2 flex items-center gap-1">
                  Responsáveis Legais<span className="text-red-500">*</span>
                </h2>

                {responsaveis.map((r, idx) => (
                  <Card key={idx} className="p-2 sm:p-4">
                    <CardContent className="p-0 space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm sm:text-base">Responsável {idx + 1}</h3>
                        {responsaveis.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeResponsavel(idx)}
                            className="bg-red-500 hover:bg-red-600 h-8 text-xs sm:text-sm"
                          >
                            <X className="bg-red-500 hover:bg-red-600 h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Remover
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor={`resp-${idx}-nome`} className="flex items-center gap-1 text-sm sm:text-base">
                            Nome Completo<span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id={`resp-${idx}-nome`}
                            value={r.nome}
                            onChange={(e) => handleResponsavelChange(idx, "nome", e.target.value)}
                            required
                            className={`${errors[`responsavel_${idx}_nome`] ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                          />
                          {errors[`responsavel_${idx}_nome`] && (
                            <p className="text-xs text-red-500">{errors[`responsavel_${idx}_nome`]}</p>
                          )}
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor={`resp-${idx}-cpf`} className="flex items-center gap-1 text-sm sm:text-base">
                            CPF<span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id={`resp-${idx}-cpf`}
                            value={r.cpf}
                            onChange={(e) => handleResponsavelChange(idx, "cpf", formatadores.cpf(e.target.value))}
                            required
                            maxLength={14}
                            className={`${errors[`responsavel_${idx}_cpf`] ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                          />
                          {errors[`responsavel_${idx}_cpf`] && (
                            <p className="text-xs text-red-500">{errors[`responsavel_${idx}_cpf`]}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                            htmlFor={`resp-${idx}-telefone`}
                            className="flex items-center gap-1 text-sm sm:text-base"
                          >
                            Telefone<span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id={`resp-${idx}-telefone`}
                            value={r.telefone}
                            onChange={(e) =>
                              handleResponsavelChange(idx, "telefone", formatadores.telefone(e.target.value))
                            }
                            required
                            maxLength={15}
                            className={`${errors[`responsavel_${idx}_telefone`] ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                          />
                          {errors[`responsavel_${idx}_telefone`] && (
                            <p className="text-xs text-red-500">{errors[`responsavel_${idx}_telefone`]}</p>
                          )}
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor={`resp-${idx}-email`} className="flex items-center gap-1 text-sm sm:text-base">
                            E-mail<span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id={`resp-${idx}-email`}
                            type="email"
                            value={r.email}
                            onChange={(e) => handleResponsavelChange(idx, "email", e.target.value)}
                            required
                            className={`${errors[`responsavel_${idx}_email`] ? "border-red-500" : ""} h-9 sm:h-10 text-sm sm:text-base`}
                          />
                          {errors[`responsavel_${idx}_email`] && (
                            <p className="text-xs text-red-500">{errors[`responsavel_${idx}_email`]}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  onClick={addResponsavel}
                  variant="outline"
                  className="w-full h-9 sm:h-10 text-sm sm:text-base"
                >
                  Adicionar Responsável
                </Button>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold border-b pb-3">Documentos</h2>

              <FileUploadZone
                files={personalDocs}
                setter={setPersonalDocs}
                label="Documentos Pessoais"
                required={true}
              />
              {errors.personalDocs && <p className="text-xs text-red-500 mt-1">{errors.personalDocs}</p>}

              {tipo === "escritorio" && (
                <>
                  <FileUploadZone
                    files={socialContract}
                    setter={setSocialContract}
                    label="Contrato Social"
                    required={true}
                  />
                  {errors.socialContract && <p className="text-xs text-red-500 mt-1">{errors.socialContract}</p>}
                </>
              )}
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground">
              <p>
                Campos marcados com <span className="text-red-500">*</span> são obrigatórios
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button type="button" variant="outline" onClick={onVoltar} className="h-10 sm:h-11 text-sm sm:text-base">
                Voltar
              </Button>
              <Button
                type="submit"
                className="bg-[#fe5000] hover:bg-[#e04600] text-white h-10 sm:h-11 text-sm sm:text-base"
              >
                Cadastrar
              </Button>
            </div>

            {formSubmitted && Object.keys(errors).length === 0 && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700">Formulário enviado com sucesso!</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
