"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Home, FileText, Users, BarChart3, Settings, Bell, Search, Plus, Menu, X, ChevronRight, Calendar, DollarSign, TrendingUp, CheckCircle2, Clock } from 'lucide-react'
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Componente de Sidebar
const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true },
    { icon: <FileText size={20} />, label: "Fianças", submenu: ["Nova Simulação", "Nova Proposta", "Listagem"] },
    { icon: <Users size={20} />, label: "Parceria", submenu: ["Contrato de Parceria"] },
    { icon: <BarChart3 size={20} />, label: "Relatórios" },
    { icon: <Settings size={20} />, label: "Configurações" },
  ]

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
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
            <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-3 p-4 border-b">
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
                  <div 
                    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                      item.active ? "bg-[#fe5000]/10 text-[#fe5000]" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.submenu && <ChevronRight size={16} />}
                  </div>
                  
                  {item.submenu && (
                    <ul className="ml-9 mt-1 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a 
                            href="#" 
                            className="block px-3 py-1 text-sm text-gray-600 hover:text-[#fe5000] rounded-md hover:bg-[#fe5000]/5"
                          >
                            {subItem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Rodapé da sidebar */}
          <div className="p-4 border-t">
            <div className="bg-[#fe5000]/10 rounded-lg p-3">
              <p className="text-xs text-gray-700 mb-2">Precisa de ajuda?</p>
              <Button variant="default" size="sm" className="w-full bg-[#fe5000] hover:bg-[#e04600]">
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
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Buscar..." 
              className="pl-10 w-[200px] md:w-[300px] h-9 bg-gray-50 border-gray-200 focus-visible:ring-[#fe5000]" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#fe5000] text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-gray-200">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback className="bg-[#fe5000]/10 text-[#fe5000]">EN</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Eduardo N.</span>
          </div>
        </div>
      </div>
    </header>
  )
}

// Componente de Banner
const Banner = () => {
  return (
    <motion.div 
      className="relative bg-[#fe5000] text-white rounded-lg overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 md:p-8 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">A FIANÇA RÁPIDA 2.0 ESTÁ CHEGANDO...</h2>
          <p className="text-lg md:text-xl opacity-90 mb-4">Com mais soluções para facilitar suas locações</p>
          <Button className="bg-white text-[#fe5000] hover:bg-gray-100">
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
      color: "bg-green-50 border-green-100"
    },
    { 
      title: "Propostas Pendentes", 
      value: "5", 
      change: "-2", 
      icon: <Clock className="text-amber-500" size={24} />,
      color: "bg-amber-50 border-amber-100"
    },
    { 
      title: "Comissões do Mês", 
      value: "R$ 3.450", 
      change: "+R$ 840", 
      icon: <DollarSign className="text-blue-500" size={24} />,
      color: "bg-blue-50 border-blue-100"
    },
    { 
      title: "Taxa de Conversão", 
      value: "68%", 
      change: "+5%", 
      icon: <TrendingUp className="text-purple-500" size={24} />,
      color: "bg-purple-50 border-purple-100"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className={`border ${stat.color}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className={`text-xs mt-1 ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} em relação ao mês anterior
                  </p>
                </div>
                <div className="p-2 rounded-full bg-white shadow-sm">
                  {stat.icon}
                </div>
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
  const actions = [
    { label: "Nova Simulação", icon: <Plus size={16} /> },
    { label: "Nova Proposta", icon: <FileText size={16} /> },
    { label: "Ver Relatórios", icon: <BarChart3 size={16} /> },
    { label: "Suporte", icon: <Users size={16} /> },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {actions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <Button 
            variant="outline" 
            className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          >
            {action.icon}
            <span className="ml-2">{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

// Componente de Últimas Fianças
const RecentFiancas = () => {
  const fiancas = [
    { 
      id: "FR-2023-1234", 
      inquilino: "Maria Silva", 
      valor: "R$ 2.500,00", 
      status: "Aprovada", 
      data: "15/04/2023",
      statusColor: "bg-green-100 text-green-800"
    },
    { 
      id: "FR-2023-1235", 
      inquilino: "João Santos", 
      valor: "R$ 1.800,00", 
      status: "Em análise", 
      data: "18/04/2023",
      statusColor: "bg-amber-100 text-amber-800"
    },
    { 
      id: "FR-2023-1236", 
      inquilino: "Ana Oliveira", 
      valor: "R$ 3.200,00", 
      status: "Aprovada", 
      data: "20/04/2023",
      statusColor: "bg-green-100 text-green-800"
    },
    { 
      id: "FR-2023-1237", 
      inquilino: "Carlos Mendes", 
      valor: "R$ 1.500,00", 
      status: "Pendente", 
      data: "22/04/2023",
      statusColor: "bg-blue-100 text-blue-800"
    },
    { 
      id: "FR-2023-1238", 
      inquilino: "Patrícia Lima", 
      valor: "R$ 2.100,00", 
      status: "Em análise", 
      data: "25/04/2023",
      statusColor: "bg-amber-100 text-amber-800"
    },
  ]

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">Últimas Fianças</CardTitle>
          <Button variant="ghost" className="text-[#fe5000] hover:text-[#e04600] hover:bg-[#fe5000]/5 -mr-2">
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
                  className="border-b last:border-0 hover:bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
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
                    <Button variant="ghost" size="sm" className="h-8 text-gray-500">
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
  )
}

// Componente de Metas e Desempenho
const PerformanceCard = () => {
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
        
        <Button variant="outline" className="w-full mt-2">Ver relatório completo</Button>
      </CardContent>
    </Card>
  )
}

// Componente de Próximos Eventos
const UpcomingEvents = () => {
  const events = [
    { 
      title: "Reunião com cliente", 
      date: "Hoje, 14:00", 
      description: "Apresentação de proposta para João Silva" 
    },
    { 
      title: "Vistoria de imóvel", 
      date: "Amanhã, 10:30", 
      description: "Apartamento na Rua Augusta, 1200" 
    },
    { 
      title: "Treinamento Fiança 2.0", 
      date: "26/04, 09:00", 
      description: "Novas funcionalidades da plataforma" 
    },
  ]

  return (
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
        <Button variant="outline" className="w-full mt-3">Ver agenda completa</Button>
      </CardContent>
    </Card>
  )
}

// Componente principal do Dashboard
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="dashboard" className="mb-6">
            <TabsList className="bg-white border">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="fiances">Minhas Fianças</TabsTrigger>
              <TabsTrigger value="comissoes">Comissões</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Banner />
          
          <QuickActions />
          
          <StatsCards />
          
          <RecentFiancas />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PerformanceCard />
            <UpcomingEvents />
          </div>
        </main>
      </div>
    </div>
  )
}
