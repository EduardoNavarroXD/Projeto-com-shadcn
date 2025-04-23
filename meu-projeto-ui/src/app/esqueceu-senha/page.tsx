'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EsqueceuSenhaPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("E-mail enviado para:", email);
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-[#e6e6e6]">
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#fe5000]">Recuperar Senha</h1>
            <p className="text-sm text-gray-500 mt-1">
              Digite seu e-mail para redefinir sua senha
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#fe5000] hover:bg-[#e14a00] text-white"
            >
              Enviar
            </Button>
          </form>
          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-[#fe5000] hover:underline"
            >
              Voltar para o login
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}