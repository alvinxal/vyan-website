'use client'
import { useRef, useEffect } from 'react'
import { Tenor_Sans } from 'next/font/google'
import gsap from 'gsap'
import Image from 'next/image'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })

export default function HeroHome() {
  const containerRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        
        tl.from(".hero-heading-line-1", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.4
        })
        .from(".hero-heading-line-2", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".hero-paragraph", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".hero-button", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".hero-location", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".hero-video", {
            scale: 1.1,
            opacity: 0,
            duration: 1
        }, "-=0.8")

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-[100dvh] min-h-[600px] flex items-center justify-center text-center z-0 mb-20 bg-black">
        <div className=" mx-auto px-6 lg:px-[60px] z-10 text-white">
          <h1 className={`text-4xl md:text-6xl leading-tight mb-6 mx-auto ${tenorSans.className}`}>
            <span className="hero-heading-line-1 block">
              Experience the Soul of Bali,
            </span>
            <span className="hero-heading-line-2 block">
              Not Just the Sights
            </span>
          </h1>
          <p className="hero-paragraph max-w-4xl mx-auto mb-10 text-sm md:text-base text-white/90">
          Hi, I’m Vyan. A local guide who shows you hidden temples,<br className="hidden md:block" />  quiet beaches, and real Balinese life. Not just the postcard spots.
          </p>
          <a
            href="https://wa.me/6281234567890?text=Hi%20Vyan,%20I'd%20like%20to%20inquire%20about%20a%20tour."
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 border border-white rounded-full overflow-hidden"
          >
            <span
              className={`relative z-10 text-base md:text-lg font-medium tracking-wide text-white group-hover:text-[#2D2623] transition-colors duration-300 ${tenorSans.className}`}
            >
              Chat With Vyan
            </span>
            <div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </div>

        {/* Location Indicator */}
        <div className="hero-location absolute bottom-12 inset-x-0 z-10">
          <div className=" mx-auto px-6 lg:px-[60px] flex items-center gap-3 text-white/90">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-[11px] tracking-normal uppercase font-semibold">Nusa Penida, Bali</span>
          </div>
        </div>

          <div className="hero-video absolute inset-0 z-[-1] will-change-transform">
            {/* Desktop Video */}
            <video 
                src="/assets/nusa.webm" 
                className="hidden md:block w-full h-full object-cover will-change-transform" 
                autoPlay 
                loop 
                muted 
                playsInline 
                poster="/nusa-penida.webp"
                preload="metadata" 
            />
            {/* Mobile Image Fallback - using Image component for optimization */}
            <div className="md:hidden w-full h-full relative">
                 <Image
                    src="/nusa-penida.webp"
                    alt="Nusa Penida"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                 />
            </div>
            
            <div className="absolute inset-0 bg-black/40 will-change-transform" />
        </div>
      </section>
  )
}
