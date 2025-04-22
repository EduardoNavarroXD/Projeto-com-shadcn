"use client"

import { useState } from "react"
import TipoCadastro from "@/components/TipoCadastro"
import FormularioCadastro from "@/components/FormularioCadastro"
import { div } from "framer-motion/client"

export default function CadastroPage() {
    const [tipo, setTipo] = useState<string | null>(null)

    return (
        <div className="max-w-2xl mx-auto p-6">
            {!tipo ? (
                <TipoCadastro onSelect={setTipo} />
            ):(
                <FormularioCadastro tipo={tipo} />
            )}
        </div>
    )
}