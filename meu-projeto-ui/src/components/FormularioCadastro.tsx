"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import Header from "@/components/Header";

interface FormularioCadastroProps {
  tipo: string;
  onVoltar: () => void;
}

export default function FormularioCadastro({ tipo, onVoltar }: FormularioCadastroProps) {
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");

  const formatarCpf = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 3) return v;
    if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
    if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
    return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
  };

  const formatarCnpj = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 2) return v;
    if (v.length <= 5) return `${v.slice(0, 2)}.${v.slice(2)}`;
    if (v.length <= 8) return `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5)}`;
    if (v.length <= 12) return `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5, 8)}/${v.slice(8)}`;
    return `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5, 8)}/${v.slice(8, 12)}-${v.slice(12, 14)}`;
  };

  const formatarTelefone = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 2) return `(${v}`;
    if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
  };

  return (
    <form className="space-y-6 px-4 sm:px-8 lg:px-16">
      <Header />

      {tipo === "assessor" ? (
        <>
          <div>
            <Label htmlFor="nome">Nome Completo</Label>
            <Input id="nome" type="text" required />
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
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
            <Label htmlFor="razaoSocial">Razão Social</Label>
            <Input id="razaoSocial" type="text" required />
          </div>
          <div>
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              type="text"
              value={cnpj}
              onChange={e => setCnpj(formatarCnpj(e.target.value))}
              required
            />
          </div>
        </>
      )}

      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="telefone">Telefone</Label>
        <Input
          id="telefone"
          type="tel"
          value={telefone}
          onChange={e => setTelefone(formatarTelefone(e.target.value))}
          required
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={onVoltar}
          className="w-full sm:w-auto py-2 px-4 bg-transparent text-[#fe5000] border-[#fe5000] rounded-lg hover:bg-[#fe5000]/10 transition-colors"
        >
          Voltar
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto py-2 px-4 bg-[#fe5000] text-white rounded-lg hover:bg-[#e14a00] transition-colors"
        >
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
