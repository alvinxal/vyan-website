'use client'
import { useRef, useEffect } from 'react'
import { Tenor_Sans, Montserrat } from 'next/font/google'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useLoading } from '@/lib/loading-context'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

export default function CTASection() {
  const { isLoading } = useLoading()
  const ctaSectionRef = useRef<HTMLElement>(null)

  // CTA Section Parallax
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      // CTA content fade in
      gsap.from('.cta-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => ctx.revert()
  }, [isLoading])

  return (
      <section ref={ctaSectionRef} className="relative min-h-[85vh] flex flex-col justify-center items-center text-center text-white overflow-hidden">
        <video
          src="/beach_webm.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black/40 z-0 will-change-transform" />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#F8F5F0]/30 to-transparent z-0 will-change-transform" />

        <div className="cta-content relative z-10 max-w-4xl mx-auto px-6">
          <div className="p-4">
            <span className="block mb-6 text-sm md:text-base uppercase tracking-[0.3em] font-medium opacity-90 drop-shadow-md">
              Start Your Journey
            </span>
            <h2 className={`text-4xl md:text-6xl mb-8 ${tenorSans.className} leading-tight drop-shadow-lg`}>
              Ready to See Bali <br className="hidden md:block"/> Through a Local&#39;s Eyes?
            </h2>
            <p className={`text-base mb-12 opacity-90 leading-relaxed max-w-2xl mx-auto ${montserrat.className} drop-shadow-md text-sm md:text-base`}>
              Let&#39;s craft a story that belongs only to you. No rushed schedules, just authentic moments and hidden gems.
            </p>
            <Link href="/inquiry" className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 bg-[#F8F5F0] text-[#2D2623] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl">
              <span className={`relative z-10 text-base md:text-lg font-medium tracking-wide ${tenorSans.className}`}>Let&#39;s Talk</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>
  )
}
