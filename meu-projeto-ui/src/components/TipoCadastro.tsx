"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Lato } from "next/font/google";

const latoBoldItalic = Lato({
  weight: "700",
  style: "italic",
  subsets: ["latin"],
});

export default function TipoCadastro({ onSelect }: { onSelect: (tipo: string) => void }) {
  const router = useRouter();
  const handleVoltar = () => {
    router.push("/login");
  };

  return (
    <div className="p-5 rounded-lg mx-auto max-w-md sm:max-w-lg">
      <div
        className="flex items-center justify-center gap-2 sm:gap-4 mb-6 min-w-0 cursor-pointer transition"
        onClick={handleVoltar}
      >
        <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 relative">
          <Image
            src="https://app.fiancarapida.com/logo.svg"
            alt="Logo"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <h1
          className={`${latoBoldItalic.className} 
            font-bold italic text-[#fe5000] whitespace-nowrap
            text-[clamp(1.25rem,5vw,2rem)]
            flex-shrink`}
        >
          Fiança Rápida
        </h1>
      </div>

      <p className="text-center text-sm sm:text-base mb-4">
        Para se cadastrar como um parceiro <span className="text-[#fe5000]">Pessoa Física</span>, selecione a opção{" "}
        <span className="text-[#fe5000]">Assessor Autônomo</span>.
      </p>
      <p className="text-center text-sm sm:text-base mb-6">
        Para se cadastrar como um parceiro <span className="text-[#fe5000]">Pessoa Jurídica</span>, selecione a opção{" "}
        <span className="text-[#fe5000]">Escritório Associado</span>.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-[#fe5000]">
        Desejo cadastrar um:
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => onSelect("assessor")}
          className="text-[#fe5000] border-[#fe5000] hover:bg-orange-100 w-full sm:w-auto"
        >
          Assessor Autônomo
        </Button>
        <Button
          variant="outline"
          onClick={() => onSelect("escritorio")}
          className="text-[#fe5000] border-[#fe5000] hover:bg-orange-100 w-full sm:w-auto"
        >
          Escritório Associado
        </Button>
      </div>
    </div>
  );
}
