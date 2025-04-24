"use client"

import React, { useState, DragEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"

interface Rep {
  nome: string
  cpf: string
  telefone: string
  email: string
}

interface FormularioCadastroProps {
  tipo: string
  onVoltar: () => void
}

export default function FormularioCadastro({ tipo, onVoltar }: FormularioCadastroProps) {
  const [cpf, setCpf] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [telefone, setTelefone] = useState("")
  const [razaoSocial, setRazaoSocial] = useState("")
  const [nomeFantasia, setNomeFantasia] = useState("")
  const [creci, setCreci] = useState("")

  const [email, setEmail] = useState("")
  const [cep, setCep] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("")

  const [reps, setReps] = useState<Rep[]>([
    { nome: "", cpf: "", telefone: "", email: "" },
  ])

  const [personalDocs, setPersonalDocs] = useState<File[]>([])
  const [socialContract, setSocialContract] = useState<File[]>([])

  function formatarCpf(v: string) {
    const x = v.replace(/\D/g, "")
    if (x.length <= 3) return x
    if (x.length <= 6) return `${x.slice(0, 3)}.${x.slice(3)}`
    if (x.length <= 9) return `${x.slice(0, 3)}.${x.slice(3, 6)}.${x.slice(6)}`
    return `${x.slice(0, 3)}.${x.slice(3, 6)}.${x.slice(6, 9)}-${x.slice(9, 11)}`
  }

  function formatarCnpj(v: string) {
    const x = v.replace(/\D/g, "")
    if (x.length <= 2) return x
    if (x.length <= 5) return `${x.slice(0, 2)}.${x.slice(2)}`
    if (x.length <= 8) return `${x.slice(0, 2)}.${x.slice(2, 5)}.${x.slice(5)}`
    if (x.length <= 12) return `${x.slice(0, 2)}.${x.slice(2, 5)}.${x.slice(5, 8)}/${x.slice(8)}`
    return `${x.slice(0, 2)}.${x.slice(2, 5)}.${x.slice(5, 8)}/${x.slice(8, 12)}-${x.slice(12, 14)}`
  }

  function formatarTelefone(v: string) {
    const x = v.replace(/\D/g, "")
    if (x.length <= 2) return `(${x}`
    if (x.length <= 6) return `(${x.slice(0, 2)}) ${x.slice(2)}`
    return `(${x.slice(0, 2)}) ${x.slice(2, 7)}-${x.slice(7, 11)}`
  }

  function handleAddRep() {
    setReps([...reps, { nome: "", cpf: "", telefone: "", email: "" }])
  }

  function handleRepChange(idx: number, field: keyof Rep, value: string) {
    const updated = [...reps]
    updated[idx] = { ...updated[idx], [field]: value }
    setReps(updated)
  }

  function onDropFiles(
    e: DragEvent<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<File[]>>
  ) {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    setter(prev => [...prev, ...files])
  }

  function renderDropZone(
    files: File[],
    setter: React.Dispatch<React.SetStateAction<File[]>>,
    label: string
  ) {
    return (
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => onDropFiles(e, setter)}
        className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer"
      >
        <p className="text-sm mb-2">{label}</p>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={e => e.target.files && setter(Array.from(e.target.files))}
        />
        {files.length > 0 && (
          <ul className="mt-2 text-left text-xs">
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <form className="space-y-6 px-4 sm:px-8 lg:px-16">
      <Header />

      {tipo === "assessor" ? (
        <>
          <div>
            <Label htmlFor="nome">Nome Completo*</Label>
            <Input id="nome" type="text" required />
          </div>
          <div>
            <Label htmlFor="cpf">CPF*</Label>
            <Input
              id="cpf"
              type="text"
              value={cpf}
              onChange={e => setCpf(formatarCpf(e.target.value))}
              required
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <Label htmlFor="razaoSocial">Razão Social*</Label>
            <Input
              id="razaoSocial"
              type="text"
              value={razaoSocial}
              onChange={e => setRazaoSocial(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
            <Input
              id="nomeFantasia"
              type="text"
              value={nomeFantasia}
              onChange={e => setNomeFantasia(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="cnpj">CNPJ*</Label>
            <Input
              id="cnpj"
              type="text"
              value={cnpj}
              onChange={e => setCnpj(formatarCnpj(e.target.value))}
              required
            />
          </div>
          <div>
            <Label htmlFor="creci">CRECI</Label>
            <Input
              id="creci"
              type="text"
              value={creci}
              onChange={e => setCreci(e.target.value)}
            />
          </div>
        </>
      )}

      {/* Comuns */}
      <div>
        <Label htmlFor="telefone">Telefone*</Label>
        <Input
          id="telefone"
          type="tel"
          value={telefone}
          onChange={e => setTelefone(formatarTelefone(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">E-mail*</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="cep">CEP*</Label>
        <Input
          id="cep"
          type="text"
          value={cep}
          onChange={e => setCep(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="logradouro">Logradouro*</Label>
          <Input
            id="logradouro"
            type="text"
            value={logradouro}
            onChange={e => setLogradouro(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="numero">Número*</Label>
          <Input
            id="numero"
            type="text"
            value={numero}
            onChange={e => setNumero(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            type="text"
            value={complemento}
            onChange={e => setComplemento(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="bairro">Bairro*</Label>
          <Input
            id="bairro"
            type="text"
            value={bairro}
            onChange={e => setBairro(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="cidade">Cidade*</Label>
          <Input
            id="cidade"
            type="text"
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="uf">UF*</Label>
          <Input
            id="uf"
            type="text"
            value={uf}
            onChange={e => setUf(e.target.value)}
            required
          />
        </div>
      </div>

      {tipo === "escritorio" && (
        <>
          <div className="space-y-4">
            <Label>Responsáveis legais</Label>
            {reps.map((r, i) => (
              <div key={i} className="space-y-2 border p-4 rounded">
                <Input
                  placeholder="Nome completo"
                  value={r.nome}
                  onChange={e => handleRepChange(i, "nome", e.target.value)}
                  required
                />
                <Input
                  placeholder="CPF"
                  value={r.cpf}
                  onChange={e =>
                    handleRepChange(i, "cpf", formatarCpf(e.target.value))
                  }
                  required
                />
                <Input
                  placeholder="Telefone"
                  value={r.telefone}
                  onChange={e =>
                    handleRepChange(i, "telefone", formatarTelefone(e.target.value))
                  }
                  required
                />
                <Input
                  placeholder="E-mail"
                  type="email"
                  value={r.email}
                  onChange={e => handleRepChange(i, "email", e.target.value)}
                  required
                />
              </div>
            ))}
            <Button variant="ghost" onClick={handleAddRep}>
              Adicionar responsável
            </Button>
          </div>
        </>
      )}

      {/* Upload de documentos */}
      <div className="space-y-4">
        {renderDropZone(personalDocs, setPersonalDocs, "Documentos pessoais*")}
        {tipo === "escritorio" &&
          renderDropZone(
            socialContract,
            setSocialContract,
            "Contrato Social*"
          )}
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" onClick={onVoltar} className="w-full sm:w-auto">
          Voltar
        </Button>
        <Button type="submit" className="w-full sm:w-auto bg-[#fe5000] text-white">
          Cadastrar
        </Button>
      </div>
    </form>
  )
}
