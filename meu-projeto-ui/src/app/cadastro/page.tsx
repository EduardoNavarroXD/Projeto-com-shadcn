"use client"

import { useState } from "react";
import TipoCadastro from "@/components/TipoCadastro";
import FormularioCadastro from "@/components/FormularioCadastro";
import { Card, CardContent } from "@/components/ui/card";

export default function CadastroPage() {
  const [tipo, setTipo] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4 py-6">
  
      {!tipo ? (
        <TipoCadastro onSelect={setTipo} />
      ) : (
        <FormularioCadastro tipo={tipo} onVoltar={() => setTipo(null)} />
      )}
</main>
  );
}