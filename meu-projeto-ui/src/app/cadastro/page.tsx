"use client"

import { useState } from "react";
import TipoCadastro from "@/components/TipoCadastro";
import FormularioCadastro from "@/components/FormularioCadastro";
import { Card, CardContent } from "@/components/ui/card";

export default function CadastroPage() {
  const [tipo, setTipo] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4 py-6">
  <Card className="w-full max-w-xl shadow-xl rounded-2xl border border-[#e6e6e6]">
    <CardContent className="p-8">
      {!tipo ? (
        <TipoCadastro onSelect={setTipo} />
      ) : (
        <FormularioCadastro tipo={tipo} onVoltar={() => setTipo(null)} />
      )}
    </CardContent>
  </Card>
</main>
  );
}