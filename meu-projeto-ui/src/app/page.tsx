import Link from "next/link";
import { Lato } from "next/font/google";
import { Button } from "@/components/ui/button";

const latoBoldItalic = Lato({
  weight: '700',
  style: 'italic',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-6">
  <h1 className={`${latoBoldItalic.className} text-4xl sm:text-5xl font-bold italic text-[#fe5000] mb-6`}>
    Fiança Rápida
  </h1>
  <p className="text-lg sm:text-xl text-gray-700 mb-6 text-center max-w-md">
    Bem-vindo à nossa plataforma! Resolva tudo online de forma simples, segura e rápida.
  </p>
  <button className="text-white bg-[#fe5000] hover:bg-[#e94a00] py-2 px-6 rounded-lg transition-all duration-300 ease-in-out w-full sm:w-auto">
    Começar agora
  </button>

  <Link href="/login">
    <Button
      variant="outline"
      className="text-[#fe5000] border-[#fe5000] hover:bg-orange-100 transition-all duration-300 ease-in-out hover:scale-105 w-full sm:w-auto mt-4">
      Ir para login
    </Button>
  </Link>
</main>
  );
}