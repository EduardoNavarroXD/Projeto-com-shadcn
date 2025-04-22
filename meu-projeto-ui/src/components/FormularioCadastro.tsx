// components/FormularioCadastro.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

export default function FormularioCadastro({ tipo }: { tipo: string }) {
  console.log("Tipo recebido:", tipo)

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
            <Input id="cpf" type="text" required />
          </div>
          {/* Adicione outros campos necessários */}
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
          {/* Adicione outros campos necessários */}
        </>
      )}
      {/* Campos comuns */}
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="telefone">Telefone</Label>
        <Input id="telefone" type="tel" required />
      </div>
      {/* Botões */}
      <div className="flex justify-between">
        <Button variant="ghost" type="button">
          Voltar
        </Button>
        <Button type="submit">Cadastrar</Button>
      </div>
    </form>
  );
}
