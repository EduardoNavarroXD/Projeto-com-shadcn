"use client";

import { useState, useEffect, useRef, DragEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";

interface Responsavel {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

interface FormularioCadastroProps {
  tipo: string;
  onVoltar: () => void;
}

export default function FormularioCadastro({ tipo, onVoltar }: FormularioCadastroProps) {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [personalDocs, setPersonalDocs] = useState<File[]>([]);
  const [socialContract, setSocialContract] = useState<File[]>([]);
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([
    { nome: "", cpf: "", telefone: "", email: "" },
  ]);
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");

  const formatar = {
    cep: (v: string) => v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2"),
    cpf: (v: string) => v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4"),
    cnpj: (v: string) => v.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2"),
    telefone: (v: string) => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2"),
  };

  useEffect(() => {
    if (cep.length === 9) {
      const raw = cep.replace("-", "");
      fetch(`https://viacep.com.br/ws/${raw}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setLogradouro(data.logradouro);
            setBairro(data.bairro);
            setCidade(data.localidade);
            setUf(data.uf);
          }
        });
    }
  }, [cep]);

  function onDropFiles(e: DragEvent<HTMLDivElement>, setter: React.Dispatch<React.SetStateAction<File[]>>) {
    e.preventDefault();
    setter((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
  }

  function renderUploadZone(files: File[], setter: React.Dispatch<React.SetStateAction<File[]>>, label: string) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDropFiles(e, setter)}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer"
      >
        <label className="block mb-2">{label}</label>
        <input
          type="file"
          multiple
          ref={inputRef}
          className="hidden"
          onChange={(e) => {
            const list = e.currentTarget.files || [];
            setter((prev) => [...prev, ...Array.from(list)]);
          }}
        />
        {files.length > 0 && (
          <ul className="mt-2 text-sm text-left">
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const handleResponsavelChange = (idx: number, field: keyof Responsavel, value: string) =>
    setResponsaveis((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );

  const addResponsavel = () =>
    setResponsaveis((prev) => [...prev, { nome: "", cpf: "", telefone: "", email: "" }]);

  const removeResponsavel = (idx: number) =>
    setResponsaveis((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Cadastro enviado com sucesso!");
    setCep("");
    setLogradouro("");
    setBairro("");
    setCidade("");
    setUf("");
    setCpf("");
    setCnpj("");
    setTelefone("");
    setEmail("");
    setPersonalDocs([]);
    setSocialContract([]);
    setResponsaveis([{ nome: "", cpf: "", telefone: "", email: "" }]);
    setNumero("");
    setComplemento("");
    setNomeCompleto("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-4 sm:px-8 lg:px-16 max-w-md mx-auto">
      <Header />

      <div>
        <Label htmlFor="cep">CEP*</Label>
        <Input id="cep" value={cep} onChange={(e) => setCep(formatar.cep(e.target.value))} maxLength={9} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Label htmlFor="logradouro">Logradouro*</Label><Input id="logradouro" value={logradouro} readOnly /></div>
        <div><Label htmlFor="numero">Número*</Label><Input id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required /></div>
        <div><Label htmlFor="complemento">Complemento</Label><Input id="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} /></div>
        <div><Label htmlFor="bairro">Bairro*</Label><Input id="bairro" value={bairro} readOnly /></div>
        <div><Label htmlFor="cidade">Cidade*</Label><Input id="cidade" value={cidade} readOnly /></div>
        <div><Label htmlFor="uf">UF*</Label><Input id="uf" value={uf} readOnly /></div>
      </div>

      {tipo === "assessor" ? (
        <>
          <Label htmlFor="nome">Nome Completo*</Label>
          <Input id="nome" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} maxLength={100} required />
          <Label htmlFor="cpf">CPF*</Label>
          <Input id="cpf" value={cpf} onChange={(e) => setCpf(formatar.cpf(e.target.value))} maxLength={14} required />
        </>
      ) : (
        <>
          <Label htmlFor="razaoSocial">Razão Social*</Label>
          <Input id="razaoSocial" maxLength={100} required />
          <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
          <Input id="nomeFantasia" maxLength={100} />
          <Label htmlFor="cnpj">CNPJ*</Label>
          <Input id="cnpj" value={cnpj} onChange={(e) => setCnpj(formatar.cnpj(e.target.value))} maxLength={18} required />
          <Label htmlFor="creci">CRECI</Label>
          <Input id="creci" maxLength={20} />
        </>
      )}

      {tipo === "escritorio" && (
        <div className="space-y-4">
          <Label>Responsáveis Legais*</Label>
          {responsaveis.map((r, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded">
              <Input placeholder="Nome completo" value={r.nome} onChange={(e) => handleResponsavelChange(idx, "nome", e.target.value)} maxLength={100} required />
              <Input placeholder="CPF" value={r.cpf} onChange={(e) => handleResponsavelChange(idx, "cpf", formatar.cpf(e.target.value))} maxLength={14} required />
              <Input placeholder="Telefone" value={r.telefone} onChange={(e) => handleResponsavelChange(idx, "telefone", formatar.telefone(e.target.value))} maxLength={15} required />
              <Input placeholder="E-mail" type="email" value={r.email} onChange={(e) => handleResponsavelChange(idx, "email", e.target.value)} maxLength={100} required />
              <Button type="button" variant="outline" className="col-span-full" onClick={() => removeResponsavel(idx)}>Remover responsável</Button>
            </div>
          ))}
          <Button type="button" onClick={addResponsavel} className="w-full">Adicionar responsável</Button>
        </div>
      )}

      <Label htmlFor="telefone">Telefone*</Label>
      <Input id="telefone" value={telefone} onChange={(e) => setTelefone(formatar.telefone(e.target.value))} maxLength={15} required />
      <Label htmlFor="email">E-mail*</Label>
      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={100} required />

      <div className="space-y-4">
        {renderUploadZone(personalDocs, setPersonalDocs, "Documentos pessoais*")}
        {tipo === "escritorio" && renderUploadZone(socialContract, setSocialContract, "Contrato Social*")}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button type="button" variant="outline" onClick={onVoltar} className="w-full sm:w-auto">Voltar</Button>
        <Button type="submit" className="w-full sm:w-auto bg-[#fe5000] text-white">Cadastrar</Button>
      </div>
    </form>
  );
}
