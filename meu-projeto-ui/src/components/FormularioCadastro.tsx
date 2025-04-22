import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

interface FormularioCadastroProps {
  tipo: string;
  onVoltar: () => void;
}

export default function FormularioCadastro({ tipo, onVoltar }: FormularioCadastroProps) {
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  // Função para formatar CPF
  const formatarCpf = (value: string) => {
    const cpf = value.replace(/\D/g, ""); // Remove tudo o que não for número
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  };

  // Função para formatar Telefone
  const formatarTelefone = (value: string) => {
    const telefone = value.replace(/\D/g, ""); // Remove tudo o que não for número
    if (telefone.length <= 2) return `(${telefone}`;
    if (telefone.length <= 6) return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
  };

  // Atualiza os campos com a formatação
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpf(formatarCpf(value));
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTelefone(formatarTelefone(value));
  };

  return (
    <form className="space-y-4">
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
              onChange={handleCpfChange}
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
            <Input id="cnpj" type="text" required />
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
          onChange={handleTelefoneChange}
          required
        />
      </div>
      <div className="flex justify-between">
      <Button
        variant="outline"
        type="button"
        onClick={onVoltar}
        className="py-2 px-4 bg-[#fe5000] text-white rounded-lg shadow-md hover:bg-[#e14a00] focus:outline-none focus:ring-2 focus:ring-[#fe5000] focus:ring-opacity-75"
      >
        Voltar
      </Button>
      <Button
        type="submit"
        className="py-2 px-4 bg-[#fe5000] text-white rounded-lg shadow-md hover:bg-[#e14a00] focus:outline-none focus:ring-2 focus:ring-[#fe5000] focus:ring-opacity-75"
      >
        Cadastrar
      </Button>
      </div>
    </form>
  );
}