'use client'
import { Montserrat } from 'next/font/google'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useLoading } from '@/lib/loading-context'
import HeroHome from '@/components/sections/HeroHome'

const GuideSection = dynamic(() => import('@/components/sections/GuideSection'))
const MapSection = dynamic(() => import('@/components/sections/MapSection'))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'))
const CTASection = dynamic(() => import('@/components/sections/CTASection'))

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AlternativePage() {
  const { isLoading } = useLoading()

  // Lenis Smooth Scroll
  useEffect(() => {
    // Only initialize Lenis after loading is complete
    if (isLoading) return

    // Disable Lenis on mobile devices (screen width < 768px)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return
    }

    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [isLoading])

  // Main page content
  return (
    <div className={`${montserrat.className} bg-[#F8F5F0] text-white leading-relaxed overflow-x-hidden bg-grain`}>
      {/* Header */}
      <Header variant="transparent" />

      {/* Hero Section */}
      <HeroHome />

      {/* Guide Section */}
      <GuideSection />

      {/* Map Section (includes Tours title and Map) */}
      <MapSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
