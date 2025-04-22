import { Button } from "@/components/ui/button";

export default function TipoCadastro({ onSelect }: { onSelect: (tipo: string) => void }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Desejo cadastrar um:</h2>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => onSelect("assessor")}>
          Assessor Autônomo
        </Button>
        <Button variant="outline" onClick={() => onSelect("escritorio")}>
          Escritório Associado
        </Button>
      </div>
    </div>
  );
}