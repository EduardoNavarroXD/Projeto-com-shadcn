"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Home,
  FileText,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

// Componente de Sidebar
const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    Fianças: true,
    Parceria: false,
  })

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const handleNavigation = (path: string) => {
    // Fechar sidebar em dispositivos móveis após navegação
    if (window.innerWidth < 1024) {
      toggleSidebar()
    }
    router.push(path)
  }

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      active: true,
      path: "/dashboard",
    },
    {
      icon: <FileText size={20} />,
      label: "Fianças",
      submenu: [
        { label: "Nova Simulação", path: "/dashboard/simulacao" },
        { label: "Nova Proposta", path: "/dashboard/proposta" },
        { label: "Listagem", path: "/dashboard/fiancas" },
      ],
    },
    {
      icon: <Users size={20} />,
      label: "Parceria",
      submenu: [{ label: "Contrato de Parceria", path: "/dashboard/contrato" }],
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Relatórios",
      path: "/dashboard/relatorios",
    },
    {
      icon: <Settings size={20} />,
      label: "Configurações",
      path: "/dashboard/configuracoes",
    },
  ]

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 z-50 h-full bg-white shadow-lg overflow-hidden lg:relative lg:z-0 transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 lg:w-64"
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          {/* Logo e botão de fechar */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation("/dashboard")}>
              <div className="relative w-8 h-8">
                <Image
                  src="https://app.fiancarapida.com/logo.svg"
                  alt="Logo Fiança Rápida"
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>
              <h1 className="font-bold text-[#fe5000] text-lg">Fiança Rápida</h1>
            </div>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
              aria-label="Fechar menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Perfil do usuário */}
          <div
            className="flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-gray-50"
            onClick={() => handleNavigation("/dashboard/perfil")}
          >
            <Avatar className="h-10 w-10 border-2 border-[#fe5000]/20">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
              <AvatarFallback className="bg-[#fe5000]/10 text-[#fe5000]">EN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">Eduardo Navarro</span>
              <span className="text-xs text-gray-500">Corretor</span>
            </div>
          </div>

          {/* Menu de navegação */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.submenu ? (
                    <>
                      <div
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                          expandedItems[item.label]
                            ? "bg-[#fe5000]/10 text-[#fe5000]"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => toggleExpand(item.label)}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        {expandedItems[item.label] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>

                      {expandedItems[item.label] && (
                        <motion.ul
                          className="ml-9 mt-1 space-y-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <a
                                onClick={() => handleNavigation(subItem.path)}
                                className="block px-3 py-1 text-sm text-gray-600 hover:text-[#fe5000] rounded-md hover:bg-[#fe5000]/5 cursor-pointer"
                              >
                                {subItem.label}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </>
                  ) : (
                    <div
                      className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                        item.active ? "bg-[#fe5000]/10 text-[#fe5000]" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => handleNavigation(item.path || "/dashboard")}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Rodapé da sidebar */}
          <div className="p-4 border-t">
            <div className="bg-[#fe5000]/10 rounded-lg p-3">
              <p className="text-xs text-gray-700 mb-2">Precisa de ajuda?</p>
              <Button
                variant="default"
                size="sm"
                className="w-full bg-[#fe5000] hover:bg-[#e04600]"
                onClick={() => {
                  toast.success("Solicitação de suporte enviada!", {
                    description: "Nossa equipe entrará em contato em breve.",
                  })
                }}
              >
                Suporte
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

// Componente de Header
const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "Nova proposta aprovada",
      description: "A proposta FR-2023-1234 foi aprovada",
      time: "Há 2 horas",
      unread: true,
    },
    {
      id: 2,
      title: "Lembrete de vistoria",
      description: "Vistoria agendada para amanhã às 10:30",
      time: "Há 5 horas",
      unread: true,
    },
    {
      id: 3,
      title: "Atualização do sistema",
      description: "Novas funcionalidades disponíveis",
      time: "Há 1 dia",
      unread: true,
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast.info(`Pesquisando por: ${searchQuery}`)
    }
  }

  const markAllAsRead = () => {
    toast.success("Todas as notificações marcadas como lidas")
    setShowNotifications(false)
  }

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>

          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar..."
              className="pl-10 w-[200px] md:w-[300px] h-9 bg-gray-50 border-gray-200 focus-visible:ring-[#fe5000]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#fe5000] text-white text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white w-80">
              <DropdownMenuLabel className="bg-white flex justify-between items-center">
                <span>Notificações</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs hover:bg-transparent hover:text-[#fe5000] p-0"
                  onClick={markAllAsRead}
                >
                  Marcar todas como lidas
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-0 focus:bg-gray-50">
                  <div className="flex gap-3 p-3 w-full cursor-pointer">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#fe5000]/10 rounded-full flex items-center justify-center">
                      <Bell className="h-4 w-4 text-[#fe5000]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {notification.unread && (
                          <span className="w-2 h-2 bg-[#fe5000] rounded-full flex-shrink-0 mt-1.5"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-[#fe5000] font-medium cursor-pointer">
                Ver todas as notificações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback className="bg-[#fe5000]/10 text-[#fe5000]">EN</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Eduardo N.</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/dashboard/perfil" className="flex w-full">
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/dashboard/configuracoes" className="flex w-full">
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  toast.info("Saindo da conta...", {
                    action: {
                      label: "Cancelar",
                      onClick: () => toast.success("Logout cancelado"),
                    },
                  })
                  setTimeout(() => {
                    window.location.href = "/login"
                  }, 2000)
                }}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

// Componente de Banner
const Banner = () => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <motion.div
        className="relative bg-[#fe5000] text-white rounded-lg overflow-hidden mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 md:p-8 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">BEM VINDO(A) A FIANÇA RÁPIDA 2.0</h2>
            <p className="text-lg md:text-xl opacity-90 mb-4">Com mais soluções para facilitar suas locações</p>
            <Button className="bg-white text-[#fe5000] hover:bg-gray-100" onClick={() => setShowDetails(true)}>
              Saiba mais
            </Button>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute right-0 bottom-0 w-32 h-32 md:w-40 md:h-40">
          <Image
            src="https://app.fiancarapida.com/logo.svg"
            alt="Logo Fiança Rápida"
            fill
            className="object-contain opacity-90"
            unoptimized
          />
        </div>

        {/* Padrão de quadrados decorativos */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-white/20 rounded-lg"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                transform: `rotate(${Math.random() * 45}deg)`,
              }}
            />
          ))}
        </div>
      </motion.div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#fe5000]">Fiança Rápida 2.0</DialogTitle>
            <DialogDescription className="text-base">
              Conheça as novidades da nova versão da plataforma
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {[
              {
                title: "Aprovação mais rápida",
                desc: "Processo de análise otimizado com aprovação em até 24 horas.",
              },
              {
                title: "Dashboard personalizado",
                desc: "Visualize suas métricas e acompanhe o desempenho em tempo real.",
              },
              {
                title: "Integração com imobiliárias",
                desc: "Conecte-se diretamente com os sistemas das principais imobiliárias.",
              },
              {
                title: "Aplicativo móvel",
                desc: "Acesse suas fianças e gerencie propostas de qualquer lugar.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fe5000]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-[#fe5000]" />
                </div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="mt-4">
            <Button
              className="bg-[#fe5000] hover:bg-[#e04600]"
              onClick={() => {
                setShowDetails(false)
                toast.success("Você será notificado quando a versão 2.0 estiver disponível!")
              }}
            >
              Quero ser avisado quando lançar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Componente de Estatísticas
const StatsCards = () => {
  const stats = [
    {
      title: "Fianças Ativas",
      value: "28",
      change: "+12%",
      icon: <CheckCircle2 className="text-green-500" size={24} />,
      color: "bg-green-50 border-green-100",
      path: "/dashboard/fiancas/ativas",
    },
    {
      title: "Propostas Pendentes",
      value: "5",
      change: "-2",
      icon: <Clock className="text-amber-500" size={24} />,
      color: "bg-amber-50 border-amber-100",
      path: "/dashboard/fiancas/pendentes",
    },
    {
      title: "Taxa de Conversão",
      value: "68%",
      change: "+5%",
      icon: <TrendingUp className="text-purple-500" size={24} />,
      color: "bg-purple-50 border-purple-100",
      path: "/dashboard/relatorios/conversao",
    },
  ]

  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={() => router.push(stat.path)}
          className="cursor-pointer"
        >
          <Card className={`border ${stat.color} hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className={`text-xs mt-1 ${stat.change.includes("+") ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} em relação ao mês anterior
                  </p>
                </div>
                <div className="p-2 rounded-full bg-white shadow-sm">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

// Componente de Ações Rápidas
const QuickActions = () => {
  const router = useRouter()
  const [showSimulacaoDialog, setShowSimulacaoDialog] = useState(false)

  const actions = [
    {
      label: "Nova Simulação",
      icon: <Plus size={16} />,
      action: () => setShowSimulacaoDialog(true),
      primary: true,
    },
    {
      label: "Nova Proposta",
      icon: <FileText size={16} />,
      action: () => router.push("/dashboard/proposta"),
    },
    {
      label: "Ver Relatórios",
      icon: <BarChart3 size={16} />,
      action: () => router.push("/dashboard/relatorios"),
    },
    {
      label: "Suporte",
      icon: <Users size={16} />,
      action: () => {
        toast.success("Solicitação de suporte enviada!", {
          description: "Nossa equipe entrará em contato em breve.",
        })
      },
    },
  ]

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={action.primary ? "default" : "outline"}
              className={
                action.primary
                  ? "bg-[#fe5000] hover:bg-[#e04600]"
                  : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }
              onClick={action.action}
            >
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      <Dialog open={showSimulacaoDialog} onOpenChange={setShowSimulacaoDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Nova Simulação de Fiança</DialogTitle>
            <DialogDescription>Preencha os dados abaixo para iniciar uma nova simulação de fiança.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="inquilino" className="text-sm font-medium">
                Nome do Inquilino
              </label>
              <Input id="inquilino" placeholder="Nome completo" />
            </div>

            <div className="space-y-2">
              <label htmlFor="valor" className="text-sm font-medium">
                Valor do Aluguel
              </label>
              <Input id="valor" placeholder="R$ 0,00" />
            </div>

            <div className="space-y-2">
              <label htmlFor="endereco" className="text-sm font-medium">
                Endereço do Imóvel
              </label>
              <Input id="endereco" placeholder="Rua, número, bairro" />
            </div>

            <div className="space-y-2">
              <label htmlFor="prazo" className="text-sm font-medium">
                Prazo do Contrato
              </label>
              <select
                id="prazo"
                className="w-full h-10 px-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#fe5000] focus:border-transparent"
              >
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
                <option value="36">36 meses</option>
                <option value="48">48 meses</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSimulacaoDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#fe5000] hover:bg-[#e04600]"
              onClick={() => {
                setShowSimulacaoDialog(false)
                toast.success("Simulação iniciada com sucesso!", {
                  description: "Você será redirecionado para a página de resultados.",
                })
                setTimeout(() => {
                  router.push("/dashboard/simulacao/resultado")
                }, 1000)
              }}
            >
              Iniciar Simulação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Componente de Últimas Fianças
const RecentFiancas = () => {
  const router = useRouter()
  const [selectedFianca, setSelectedFianca] = useState<string | null>(null)

  const fiancas = [
    {
      id: "FR-2023-1234",
      inquilino: "Maria Silva",
      valor: "R$ 2.500,00",
      status: "Aprovada",
      data: "15/04/2023",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "FR-2023-1235",
      inquilino: "João Santos",
      valor: "R$ 1.800,00",
      status: "Em análise",
      data: "18/04/2023",
      statusColor: "bg-amber-100 text-amber-800",
    },
    {
      id: "FR-2023-1236",
      inquilino: "Ana Oliveira",
      valor: "R$ 3.200,00",
      status: "Aprovada",
      data: "20/04/2023",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "FR-2023-1237",
      inquilino: "Carlos Mendes",
      valor: "R$ 1.500,00",
      status: "Pendente",
      data: "22/04/2023",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: "FR-2023-1238",
      inquilino: "Patrícia Lima",
      valor: "R$ 2.100,00",
      status: "Em análise",
      data: "25/04/2023",
      statusColor: "bg-amber-100 text-amber-800",
    },
  ]

  const viewDetails = (id: string) => {
    setSelectedFianca(id)
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">Últimas Fianças</CardTitle>
            <Button
              variant="ghost"
              className="text-[#fe5000] hover:text-[#e04600] hover:bg-[#fe5000]/5 -mr-2"
              onClick={() => router.push("/dashboard/fiancas")}
            >
              Ver todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-xs text-gray-500">
                  <th className="text-left py-3 px-2 font-medium">ID</th>
                  <th className="text-left py-3 px-2 font-medium">Inquilino</th>
                  <th className="text-left py-3 px-2 font-medium">Valor</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                  <th className="text-left py-3 px-2 font-medium">Data</th>
                  <th className="text-right py-3 px-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {fiancas.map((fianca, index) => (
                  <motion.tr
                    key={index}
                    className="border-b last:border-0 hover:bg-gray-50 cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => viewDetails(fianca.id)}
                  >
                    <td className="py-3 px-2 text-sm font-medium">{fianca.id}</td>
                    <td className="py-3 px-2 text-sm">{fianca.inquilino}</td>
                    <td className="py-3 px-2 text-sm">{fianca.valor}</td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary" className={`${fianca.statusColor} font-normal`}>
                        {fianca.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-500">{fianca.data}</td>
                    <td className="py-3 px-2 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-gray-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          viewDetails(fianca.id)
                        }}
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedFianca} onOpenChange={(open) => !open && setSelectedFianca(null)}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Detalhes da Fiança</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800 font-normal">
                Aprovada
              </Badge>
            </DialogTitle>
            <DialogDescription>{selectedFianca} - Emitida em 15/04/2023</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Inquilino</h3>
                <p className="text-base">Maria Silva</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">CPF</h3>
                <p className="text-base">123.456.789-00</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Valor do Aluguel</h3>
                <p className="text-base">R$ 2.500,00</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Prazo do Contrato</h3>
                <p className="text-base">36 meses</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Endereço do Imóvel</h3>
              <p className="text-base">Rua das Flores, 123 - Jardim Primavera</p>
              <p className="text-sm text-gray-500">São Paulo - SP, 01234-567</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Comissão</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#fe5000]">R$ 750,00</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Paga
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Paga em 20/04/2023</p>
            </div>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setSelectedFianca(null)}>
              Fechar
            </Button>
            <Button
              variant="outline"
              className="border-[#fe5000] text-[#fe5000] hover:bg-[#fe5000]/5"
              onClick={() => {
                toast.success("Documento gerado com sucesso!")
                setSelectedFianca(null)
              }}
            >
              Gerar PDF
            </Button>
            <Button
              className="bg-[#fe5000] hover:bg-[#e04600]"
              onClick={() => {
                router.push(`/dashboard/fiancas/${selectedFianca}`)
                setSelectedFianca(null)
              }}
            >
              Ver Detalhes Completos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Componente de Metas e Desempenho
const PerformanceCard = () => {
  const router = useRouter()

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Metas e Desempenho</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Meta de Fianças (Mensal)</span>
            <span className="text-sm font-medium">75%</span>
          </div>
          <Progress value={75} className="h-2 bg-gray-100" indicatorClassName="bg-[#fe5000]" />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">15 de 20</span>
            <span className="text-xs text-green-600">+3 em relação ao mês anterior</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Taxa de Conversão</span>
            <span className="text-sm font-medium">68%</span>
          </div>
          <Progress value={68} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">68 de 100</span>
            <span className="text-xs text-green-600">+5% em relação ao mês anterior</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Comissões Recebidas</span>
            <span className="text-sm font-medium">42%</span>
          </div>
          <Progress value={42} className="h-2 bg-gray-100" indicatorClassName="bg-blue-500" />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">R$ 3.450 de R$ 8.200</span>
            <span className="text-xs text-amber-600">Meta mensal em andamento</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={() => router.push("/dashboard/relatorios/desempenho")}
        >
          Ver relatório completo
        </Button>
      </CardContent>
    </Card>
  )
}

// Componente de Próximos Eventos
const UpcomingEvents = () => {
  const router = useRouter()
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  const events = [
    {
      id: 1,
      title: "Reunião com cliente",
      date: "Hoje, 14:00",
      description: "Apresentação de proposta para João Silva",
      location: "Escritório Central",
    },
    {
      id: 2,
      title: "Vistoria de imóvel",
      date: "Amanhã, 10:30",
      description: "Apartamento na Rua Augusta, 1200",
      location: "Rua Augusta, 1200 - Consolação",
    },
    {
      id: 3,
      title: "Treinamento Fiança 2.0",
      date: "26/04, 09:00",
      description: "Novas funcionalidades da plataforma",
      location: "Online (Microsoft Teams)",
    },
  ]

  return (
    <>
      <Card className="mt-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="flex gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                onClick={() => setSelectedEvent(event.id)}
                whileHover={{ x: 3 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[#fe5000]/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-[#fe5000]" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                  <p className="text-xs mt-1">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-3" onClick={() => router.push("/dashboard/agenda")}>
            Ver agenda completa
          </Button>
        </CardContent>
      </Card>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Evento</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">{events.find((e) => e.id === selectedEvent)?.title}</h3>
                <p className="text-sm text-gray-500">{events.find((e) => e.id === selectedEvent)?.date}</p>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2 items-start">
                  <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Descrição</p>
                    <p className="text-sm text-gray-600">{events.find((e) => e.id === selectedEvent)?.description}</p>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Local</p>
                    <p className="text-sm text-gray-600">{events.find((e) => e.id === selectedEvent)?.location}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Fechar
            </Button>
            <Button
              className="bg-[#fe5000] hover:bg-[#e04600]"
              onClick={() => {
                toast.success("Evento adicionado ao calendário!")
                setSelectedEvent(null)
              }}
            >
              Adicionar ao Calendário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Componente principal do Dashboard
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="dashboard" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="fiances">Minhas Fianças</TabsTrigger>
              <TabsTrigger value="comissoes">Comissões</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
              <Banner />
              <QuickActions />
              <StatsCards />
              <RecentFiancas />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PerformanceCard />
                <UpcomingEvents />
              </div>
            </TabsContent>

            <TabsContent value="fiances">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-bold mb-4">Minhas Fianças</h2>
                <p className="text-gray-500">Conteúdo da aba Minhas Fianças será exibido aqui.</p>
              </div>
            </TabsContent>

            <TabsContent value="comissoes">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-bold mb-4">Comissões</h2>
                <p className="text-gray-500">Conteúdo da aba Comissões será exibido aqui.</p>
              </div>
            </TabsContent>

            <TabsContent value="relatorios">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-bold mb-4">Relatórios</h2>
                <p className="text-gray-500">Conteúdo da aba Relatórios será exibido aqui.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function MapPin(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
