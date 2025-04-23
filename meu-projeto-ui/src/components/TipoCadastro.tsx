"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Lato } from "next/font/google";
import Header from "@/components/Header";

const latoBoldItalic = Lato({
  weight: "700",
  style: "italic",
  subsets: ["latin"],
});

export default function TipoCadastro({ onSelect }: { onSelect: (tipo: string) => void }) {
  const router = useRouter();
  const handleVoltar = () => {
    router.back();
  };

  return (
    <div className="p-5 rounded-lg mx-auto max-w-md sm:max-w-lg">
      <div className="flex items-center justify-center gap-4 mb-6">
        <Image
          src="https://app.fiancarapida.com/logo.svg"
          alt="Logo"
          width={60}
          height={60}
          className="object-contain"
          unoptimized
        />
        <h1
          onClick={handleVoltar}
          className={`${latoBoldItalic.className} text-3xl sm:text-5xl font-bold italic text-[#fe5000] mb-1 cursor-pointer`}
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

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-[#fe5000]">Desejo cadastrar um:</h2>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button
          variant="outline"
          onClick={() => onSelect("assessor")}
          className="text-[#fe5000] border-[#fe5000] hover:bg-orange-100 mb-4 sm:mb-0 w-full sm:w-auto"
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
