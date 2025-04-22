import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

export default function FormularioCadastro({
  tipo,
  onVoltar,
}: {
  tipo: string;
  onVoltar: () => void;
}) {
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
        <Button
          variant="outline"
          type="button"
          onClick={onVoltar}
          className="text-[#fe5000] border-[#fe5000] hover:bg-orange-100"
        >
          Voltar
        </Button>
        <Button className="bg-[#fe5000] hover:bg-[#e14a00] text-white" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}