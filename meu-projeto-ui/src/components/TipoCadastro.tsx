import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TipoCadastro({ onSelect }: { onSelect: (tipo: string) => void }) {
  return (
    <div className="p-6 rounded-lg mx-auto">
      <div className="flex items-center mb-6">
        <h1 className="text-[48px] font-bold text-[#fe5000]" style={{ fontFamily: 'Lato, sans-serif', whiteSpace: 'nowrap' }}>
          Fiança Rápida
        </h1>
        <Image
          src="https://app.fiancarapida.com/logo.svg"
          alt="Logo"
          width={80}  // Tamanho reduzido
          height={20} // Tamanho reduzido
          className="object-contain ml-4" // Aproximando a imagem do título
          unoptimized
        />
      </div>

      <p className="text-center text-sm mb-4">
        Para se cadastrar como um parceiro <span className="text-[#fe5000]">Pessoa Física</span>, selecione a opção <span className="text-[#fe5000]">Assessor Autônomo</span>.
      </p>
      <p className="text-center text-sm mb-6">
        Para se cadastrar como um parceiro <span className="text-[#fe5000]">Pessoa Jurídica</span>, selecione a opção <span className="text-[#fe5000]">Escritório Associado</span>.
      </p>

      <h2 className="text-xl font-semibold text-center mb-6 text-[#fe5000]">
        Desejo cadastrar um:
      </h2>

      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => onSelect("assessor")}
          className="text-[#fe5000] border-[#fe5000] hover:bg-orange-100"
        >
          Assessor Autônomo
        </Button>
        <Button
          variant="outline"
          onClick={() => onSelect("escritorio")}
          className="text-[#fe5000] border-[#fe5000] hover:bg-orange-100"
        >
          Escritório Associado
        </Button>
      </div>
    </div>
  );
}