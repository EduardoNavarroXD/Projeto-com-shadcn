"use client";

import { useState, useEffect, DragEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

export default function FormularioCadastro({
  tipo,
  onVoltar,
}: FormularioCadastroProps) {
  // Endereço
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  // Contato e docs
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [personalDocs, setPersonalDocs] = useState<File[]>([]);
  const [socialContract, setSocialContract] = useState<File[]>([]);

  // Responsáveis
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([
    { nome: "", cpf: "", telefone: "", email: "" },
  ]);

  // Máscaras
  const formatar = {
    cep: (v: string) => {
      const d = v.replace(/\D/g, "");
      return d.length <= 5 ? d : `${d.slice(0, 5)}-${d.slice(5, 8)}`;
    },
    cpf: (v: string) => {
      const d = v.replace(/\D/g, "");
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
      if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
      return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
    },
    cnpj: (v: string) => {
      const d = v.replace(/\D/g, "");
      if (d.length <= 2) return d;
      if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
      if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
      if (d.length <= 12)
        return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
      return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(
        8,
        12
      )}-${d.slice(12)}`;
    },
    telefone: (v: string) => {
      const d = v.replace(/\D/g, "");
      if (d.length <= 2) return `(${d}`;
      if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
      return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    },
  };

  // ViaCEP
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

  // Upload
  function onDropFiles(
    e: DragEvent<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<File[]>>
  ) {
    e.preventDefault();
    setter((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
  }

  function renderUploadZone(
    files: File[],
    setter: React.Dispatch<React.SetStateAction<File[]>>,
    label: string
  ) {
    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDropFiles(e, setter)}
        className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer"
      >
        <label className="block mb-2">{label}</label>
        <input
          type="file"
          multiple
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

  // Responsáveis handlers
  const handleResponsavelChange = (
    idx: number,
    field: keyof Responsavel,
    value: string
  ) =>
    setResponsaveis((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );
  const addResponsavel = () =>
    setResponsaveis((prev) => [
      ...prev,
      { nome: "", cpf: "", telefone: "", email: "" },
    ]);
  const removeResponsavel = (idx: number) =>
    setResponsaveis((prev) => prev.filter((_, i) => i !== idx));

  // Submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      cep,
      logradouro,
      bairro,
      cidade,
      uf,
      cpf,
      cnpj,
      telefone,
      email,
      personalDocs,
      socialContract,
      responsaveis,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 px-4 sm:px-8 lg:px-16 max-w-md mx-auto"
    >
      <Header />

      {/* Endereço */}
      <div>
        <Label htmlFor="cep">CEP*</Label>
        <Input
          id="cep"
          type="text"
          value={cep}
          onChange={(e) => setCep(formatar.cep(e.target.value))}
          placeholder="12345-678"
          maxLength={9}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="logradouro">Logradouro*</Label>
          <Input id="logradouro" type="text" value={logradouro} readOnly />
        </div>
        <div>
          <Label htmlFor="numero">Número*</Label>
          <Input id="numero" type="text" required />
        </div>
        <div>
          <Label htmlFor="complemento">Complemento</Label>
          <Input id="complemento" type="text" />
        </div>
        <div>
          <Label htmlFor="bairro">Bairro*</Label>
          <Input id="bairro" type="text" value={bairro} readOnly />
        </div>
        <div>
          <Label htmlFor="cidade">Cidade*</Label>
          <Input id="cidade" type="text" value={cidade} readOnly />
        </div>
        <div>
          <Label htmlFor="uf">UF*</Label>
          <Input id="uf" type="text" value={uf} readOnly />
        </div>
      </div>

      {/* Pessoa Física / Jurídica */}
      {tipo === "assessor" ? (
        <>
          <Label htmlFor="nome">Nome Completo*</Label>
          <Input id="nome" type="text" required />
          <Label htmlFor="cpf">CPF*</Label>
          <Input
            id="cpf"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(formatar.cpf(e.target.value))}
            required
          />
        </>
      ) : (
        <>
          <Label htmlFor="razaoSocial">Razão Social*</Label>
          <Input id="razaoSocial" type="text" required />
          <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
          <Input id="nomeFantasia" type="text" />
          <Label htmlFor="cnpj">CNPJ*</Label>
          <Input
            id="cnpj"
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(formatar.cnpj(e.target.value))}
            required
          />
          <Label htmlFor="creci">CRECI</Label>
          <Input id="creci" type="text" />
        </>
      )}

      {/* Responsáveis Legais */}
      {tipo === "escritorio" && (
        <div className="space-y-4">
          <Label>Responsáveis Legais*</Label>
          {responsaveis.map((r, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded"
            >
              <Input
                placeholder="Nome completo"
                value={r.nome}
                onChange={(e) =>
                  handleResponsavelChange(idx, "nome", e.target.value)
                }
                required
              />
              <Input
                placeholder="CPF"
                value={r.cpf}
                onChange={(e) =>
                  handleResponsavelChange(
                    idx,
                    "cpf",
                    formatar.cpf(e.target.value)
                  )
                }
                required
              />
              <Input
                placeholder="Telefone"
                value={r.telefone}
                onChange={(e) =>
                  handleResponsavelChange(
                    idx,
                    "telefone",
                    formatar.telefone(e.target.value)
                  )
                }
                required
              />
              <Input
                placeholder="E-mail"
                type="email"
                value={r.email}
                onChange={(e) =>
                  handleResponsavelChange(idx, "email", e.target.value)
                }
                required
              />
              <Button
                type="button"
                variant="outline"
                className="col-span-full"
                onClick={() => removeResponsavel(idx)}
              >
                Remover responsável
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addResponsavel} className="w-full">
            Adicionar responsável
          </Button>
        </div>
      )}

      {/* Contato */}
      <Label htmlFor="telefone">Telefone*</Label>
      <Input
        id="telefone"
        type="tel"
        value={telefone}
        onChange={(e) => setTelefone(formatar.telefone(e.target.value))}
        required
      />
      <Label htmlFor="email">E-mail*</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Upload */}
      <div className="space-y-4">
        {renderUploadZone(personalDocs, setPersonalDocs, "Documentos pessoais*")}
        {tipo === "escritorio" &&
          renderUploadZone(socialContract, setSocialContract, "Contrato Social*")}
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button type="button" variant="outline" onClick={onVoltar} className="w-full sm:w-auto">
          Voltar
        </Button>
        <Button type="submit" className="w-full sm:w-auto bg-[#fe5000] text-white">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
