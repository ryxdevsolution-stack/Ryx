"use client"

import dynamic from 'next/dynamic'
import { NavbarMinimal } from '@/components/layout/navbar-minimal'
import { FooterMinimal } from '@/components/layout/footer-minimal'

// Lazy load heavy components for better performance
const AnimatedCursor = dynamic(() => import('@/components/ui/animated-cursor').then(mod => ({ default: mod.AnimatedCursor })), {
  ssr: false,
})

const Hero3D = dynamic(() => import('@/components/sections/hero-3d').then(mod => ({ default: mod.Hero3D })), {
  ssr: false,
})

const ServicesSimple = dynamic(() => import('@/components/sections/services-simple').then(mod => ({ default: mod.ServicesSimple })), {
  ssr: true,
})

const PortfolioSimple = dynamic(() => import('@/components/sections/portfolio-simple').then(mod => ({ default: mod.PortfolioSimple })), {
  ssr: true,
})

const ContactMinimal = dynamic(() => import('@/components/sections/contact-minimal').then(mod => ({ default: mod.ContactMinimal })), {
  ssr: true,
})

export default function Home() {
  return (
    <>
      <AnimatedCursor />
      <NavbarMinimal />
      <main>
        <Hero3D />
        <ServicesSimple />
        <PortfolioSimple />
        <ContactMinimal />
      </main>
      <FooterMinimal />
    </>
  )
}