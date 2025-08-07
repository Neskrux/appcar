'use client'

import { Car, FileText, Search, TrendingUp, Shield, Zap, Award, ChevronRight, Star, Users, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: 'Avaliação Completa',
      description: 'Sistema completo para avaliações técnicas detalhadas com todos os campos necessários',
      link: '/nova-avaliacao',
      linkText: 'Começar Avaliação',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.1
    },
    {
      icon: <Search className="h-10 w-10 text-white" />,
      title: 'Busca Inteligente',
      description: 'Encontre qualquer avaliação em segundos com filtros avançados e precisos',
      link: '/avaliacoes',
      linkText: 'Explorar Avaliações',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0.2
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-white" />,
      title: 'Relatórios Profissionais',
      description: 'Gere relatórios detalhados e exporte dados para análises completas',
      link: '/relatorios',
      linkText: 'Ver Relatórios',
      gradient: 'from-green-500 to-teal-500',
      delay: 0.3
    }
  ]

  const stats = [
    { number: '500+', label: 'Avaliações Realizadas', icon: <FileText className="h-6 w-6" /> },
    { number: '150+', label: 'Clientes Satisfeitos', icon: <Users className="h-6 w-6" /> },
    { number: '99%', label: 'Taxa de Precisão', icon: <BarChart3 className="h-6 w-6" /> },
    { number: '24/7', label: 'Disponibilidade', icon: <Shield className="h-6 w-6" /> }
  ]

  const benefits = [
    { icon: <Zap />, text: 'Avaliações rápidas e precisas' },
    { icon: <Shield />, text: 'Dados seguros e protegidos' },
    { icon: <Award />, text: 'Relatórios profissionais' },
    { icon: <Star />, text: 'Interface intuitiva' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo Animation */}
            <motion.div 
              className="flex justify-center mb-8"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-8 rounded-3xl shadow-2xl">
                  <Car className="h-20 w-20 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-6xl md:text-7xl font-black mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                THE CAR
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-gray-700 font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Sistema Profissional de Avaliação Técnica
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              A solução mais completa e moderna para avaliação de veículos. 
              Tecnologia de ponta para resultados precisos e confiáveis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link 
                href="/nova-avaliacao"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-2xl hover:scale-105"
              >
                <span className="relative">Iniciar Avaliação</span>
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/avaliacoes"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-xl hover:scale-105"
              >
                <span className="relative">Ver Demonstração</span>
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Benefits Pills */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                  <span className="text-purple-500">{benefit.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="container mx-auto px-4 -mt-10 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100"
            >
              <div className="flex justify-center mb-3 text-purple-500">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Recursos Poderosos
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa para realizar avaliações profissionais de veículos em um só lugar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:border-purple-200 transition-all duration-300">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Link 
                  href={feature.link}
                  className="inline-flex items-center font-semibold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text hover:gap-3 transition-all duration-300 gap-2"
                >
                  {feature.linkText}
                  <ChevronRight className="h-5 w-5 text-purple-600" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <motion.div 
        className="container mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-16 text-center text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-60 w-60 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-60 w-60 rounded-full bg-white opacity-10"></div>
          
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para Revolucionar suas Avaliações?
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              Junte-se a centenas de profissionais que já confiam no THE CAR para suas avaliações técnicas
            </p>
            <Link 
              href="/nova-avaliacao"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-purple-600 bg-white rounded-2xl hover:shadow-2xl transform transition-all duration-200 hover:scale-105 gap-2"
            >
              Começar Agora Gratuitamente
              <ChevronRight className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}