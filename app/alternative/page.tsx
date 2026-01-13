'use client'
import { Tenor_Sans, Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

const MAP_HOTSPOTS = [
  { id: 1, x: '50%', y: '22%', title: 'Banyumala Waterfall', description: 'A stunning twin waterfall featuring crystal-clear natural pools perfect for a refreshing swim in the jungle.', image: '/banyumala.webp' },
  { id: 2, x: '76.5%', y: '15%', title: 'Savana Tianyar', description: 'A vast, golden grassland at the foot of Mount Agung that offers a unique African-safari aesthetic in Bali.', image: '/tianyar.webp' },
  { id: 3, x: '69.5%', y: '37%', title: 'Tegallalang Rice Terrace', description: 'An iconic valley of lush green rice paddies utilizing the traditional Balinese Subak irrigation system.', image: "/tegallalang.webp" },
  { id: 4, x: '68.7%', y: '67.4%', title: 'Tegal Wangi Beach', description: 'A scenic coastal escape famous for its natural rock pools that serve as private oceanfront jacuzzis.', image: '/tegalwangi.png' },
  { id: 5, x: '66.5%', y: '78%', title: 'Uluwatu Temple', description: 'A majestic sea temple perched on a steep cliff edge, renowned for its sunset views and traditional Kecak fire dances.', image: '/tanah-lot.png' },
  { id: 6, x: '71%', y: '75%', title: 'Garuda Wisnu Kencana', description: 'A sprawling cultural park home to one of the world\'s tallest monumental statues of the Hindu god Vishnu.', image: '/gwk.webp' },
  { id: 7, x: '93%', y: '62%', title: 'Nusa Penida', description: 'An offshore island paradise known for its dramatic limestone cliffs and world-class snorkeling spots like Manta Point.', image: '/nusa-penida.webp' },
  { id: 8, x: '5%', y: '26%', title: 'West Bali National Park', description: 'A protected sanctuary of monsoon forests and mangroves that serves as the last refuge for the rare Bali Starling.', image: '/west-national.webp' },
  { id: 9, x: '60%', y: '59%', title: 'Tanah Lot', description: 'An ancient Hindu shrine set upon an offshore rock formation that becomes a dramatic silhouette during sunset.', image: '/tanah-lot.webp' },
  { id: 10, x: '69.5%', y: '44.5%', title: 'Ubud Palace', description: 'A historical landmark in the heart of Bali’s cultural center featuring intricate architecture and royal dance performances.', image: "/ubud.webp" },
  { id: 11, x: '74%', y: '28%', title: 'Besakih Great Temple', description: 'Known as the "Mother Temple," this massive complex sits high on the slopes of Mount Agung as Bali\'s holiest site.', image: '/besakih.webp' },
  { id: 12, x: '69%', y: '73%', title: 'Cliff Jump Tegal Wangi Beach', description: 'A thrill-seeker\'s destination offering rugged limestone ledges for jumping into the turquoise Indian Ocean below.', image: '/cliff-jump.webp' }
];

const GUIDE_STEPS = [
  { id: 0, image: '', location: '', description: '' },
  { id: 1, image: '/vyan.webp', location: 'Nusa Penida', description: 'As a local born among the emerald rice fields, I provide more than a tour. I provide a connection to Bali\'s living culture. I am passionate about sharing the delicate balance between our ancestral heritage and the island\'s breathtaking landscapes. You are a welcomed guest invited to experience the quiet magic of my home. Let\'s create an unforgettable journey together.' },
  { id: 2, image: '/vyan.webp', location: 'Uluwatu Cliff', description: 'Experience the magic of Uluwatu\'s towering cliffs and the mesmerizing Kecak Fire Dance at sunset. I\'ll take you to hidden spots for the best ocean views that most tourists miss.' },
  { id: 3, image: '/vyan.webp', location: 'Kintamani Highland', description: 'Explore the cool highlands of Kintamani. Contrast the black lava fields of Mount Batur with the serene beauty of the lake, followed by a local coffee tasting overlooking the volcano.' },
  { id: 4, image: '/vyan.webp', location: 'Canggu Vibes', description: 'Immerse yourself in the vibrant laid-back atmosphere of Canggu. From world-class surf breaks to the trendiest beach clubs and hidden cafes, experience the modern side of Bali\'s coast.' },
]

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// export const metadata: Metadata = {
//   title: 'Vyan Abimanyu | Bali Local Guide',
//   description: 'Experience the soul of Bali with Vyan Abimanyu, a local friend who knows every hidden corner of the island.',
// }

export default function AlternativePage() {
  const guideSectionRef = useRef<HTMLElement>(null)
  const guideTrackRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHoveringMarker, setIsHoveringMarker] = useState(false)

  useEffect(() => {
    if (!cursorRef.current || !mapContainerRef.current) return

    const cursor = cursorRef.current
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" })

    const moveCursor = (e: MouseEvent) => {
      const rect = mapContainerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        xTo(x)
        yTo(y)
      }
    }

    const container = mapContainerRef.current
    container.addEventListener("mousemove", moveCursor)
    return () => container.removeEventListener("mousemove", moveCursor)
  }, [])

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.guide-slide') as HTMLElement[]
      const texts = gsap.utils.toArray('.guide-text') as HTMLElement[]
      const track = guideTrackRef.current
      
      if (!track) return

      const startX = window.innerWidth * 0.6
      gsap.set(track, { x: startX })
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: guideSectionRef.current,
          start: 'top top',
          end: () => `+=${slides.length * window.innerHeight * 1}`, 
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      })

      // Step 1: Expand First Image (Dummy Keyframe)
      tl.to(track, {
        x: window.innerWidth / 2 - 220,
        duration: 1,
        ease: 'power2.inOut'
      }, 0)
      .to(slides[0], {
        width: 440,
        height: 550,
        marginTop: 0, 
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, 0)
      .to(texts[0], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.5)

      // Subsequent Steps
      slides.forEach((slide, i) => {
        if (i === slides.length - 1) return

        const nextI = i + 1
        const nextSlide = slides[nextI]
        
        // Target X: Center - (Index * (SmallWidth + Gap) + HalfBigWidth)
        // 200 + 24 = 224
        // 440 / 2 = 220
        const targetX = window.innerWidth / 2 - (nextI * 224 + 220)
        const startTime = (i + 1) * 2

        // Move Track
        tl.to(track, {
          x: targetX,
          duration: 2,
          ease: 'power2.inOut' // Keep easing consistent
        }, startTime)

        // Shrink Current
        tl.to(slide, {
          width: 200,
          height: 240,
          marginTop: 310, // 550 - 240 = 310. Bottom aligned.
          opacity: 0.5,
          duration: 2,
          ease: 'power2.inOut'
        }, startTime)

        // Expand Next
        tl.to(nextSlide, {
          width: 440,
          height: 550,
          marginTop: 0,
          opacity: 1,
          duration: 2,
          ease: 'power2.inOut'
        }, startTime)

        // Text Transitions
        tl.to(texts[i], { opacity: 0, y: -20, duration: 0.5 }, startTime)
        tl.to(texts[nextI], { opacity: 1, y: 0, duration: 0.5 }, startTime + 1)
      })
      
    }, guideSectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className={`${montserrat.className} bg-[#F8F5F0] text-white leading-relaxed overflow-x-hidden bg-grain`}>
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`text-xl font-bold ${tenorSans.className}`}>Vyan Abimanyu</div>
          <nav className="flex gap-16">
            {['About Me', 'Destination', 'Booking'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center z-0 mb-20">
        <div className="max-w-6xl mx-auto px-6 z-10 -translate-y-[30%] text-white">
          <h1 className={`text-6xl leading-tight mb-6  mx-auto ${tenorSans.className}`}>
            Experience the Soul of Bali, <br /> Not Just the Sights
          </h1>
          <p className="max-w-lg mx-auto mb-10">
            Custom tailored private tours with a local friend <br /> who knows every hidden corner of the island.
          </p>
          <a href="#" className="inline-block px-8 py-3 border border-white rounded-full font-medium transition-all hover:bg-white hover:text-[#2D2623]">
            Chat With Vyan
          </a>
        </div>

        {/* Location Indicator */}
        <div className="absolute bottom-12 inset-x-0 z-10">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 text-white/90">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-[11px] tracking-normal uppercase font-semibold">Nusa Penida, Bali</span>
          </div>
        </div>

        <div className="absolute inset-0 z-[-1]">
          <video src="/assets/nusa.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      {/* Guide Section */}
      <section ref={guideSectionRef} className="pt-12 pb-20 overflow-hidden min-h-screen flex flex-col justify-start relative">
        {/* Text Content within centered container */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="flex-shrink-0">
            <div className="mb-12">
              <span className="block mb-4 text-[#6B6560] text-left">Meet Your Guide</span>
              <h2 className={`text-[64px] leading-tight text-left text-[#30373C] ${tenorSans.className} w-[600px]`}>
                A Local Journey <br /> With Me
              </h2>
            </div>
            {/* Dynamic Text Area */}
            <div className="relative h-[120px] max-w-[320px]">
              {GUIDE_STEPS.map((step) => (
                <div key={step.id} className="guide-text absolute top-0 left-0 opacity-0 translate-y-4">
                   {step.location && <div className={`text-xl mb-2 text-[#30373C] ${tenorSans.className}`}>{step.location}</div>}
                   {step.description && <p className="text-[#6B6560] leading-relaxed text-sm">{step.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Row with absolute positioning */}
        <div ref={guideTrackRef} className="guide-track flex gap-6 absolute top-[40%] translate-y-[-20%] items-start left-0">
          {GUIDE_STEPS.map((step) => (
            <div
              key={step.id}
              className={`guide-slide flex-shrink-0 w-[200px] h-[240px] rounded-sm overflow-hidden relative mt-[310px] origin-bottom opacity-50 ${step.image ? 'bg-black/5' : ''}`}
            >
              {step.image && (
                <>
                  <Image
                    src={step.image}
                    alt={step.location}
                    width={440}
                    height={550}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-28 mb-20">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="mb-12">
            <h2 className={`text-[64px] leading-tight max-w-[400px]  text-[#30373C] ${tenorSans.className}`}>
              Explore Our Tour
            </h2>
          </div>
          {/* Interactive Map Section */}
          <div 
            ref={mapContainerRef}
            className="relative w-full max-w-[800px] mx-auto group mb-20 cursor-none"
          >
            {/* Custom Search/Marker Cursor */}
            <div 
              ref={cursorRef}
              className={`absolute w-10 h-10 pointer-events-none z-[100] flex items-center justify-center transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 ${
                isHoveringMarker 
                  ? 'opacity-0' 
                  : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            <Image 
              src="/assets/3dmap.webp" 
              alt='map' 
              width={800} 
              height={800} 
              className="w-full h-auto"
            />
            
            {/* Hotspots */}
            {MAP_HOTSPOTS.map((point) => (
              <button
                key={point.id}
                onMouseEnter={() => setIsHoveringMarker(true)}
                onMouseMove={(e) => {
                  const btn = e.currentTarget;
                  const rect = btn.getBoundingClientRect();
                  const x = e.clientX - (rect.left + rect.width / 2);
                  const y = e.clientY - (rect.top + rect.height / 2);
                  
                  // Move outer circle
                  const circle = btn.querySelector('.outer-circle');
                  if (circle) {
                    gsap.to(circle, {
                      x: x * 0.35,
                      y: y * 0.35,
                      duration: 0.2,
                      ease: "power2.out"
                    });
                  }

                  // Move tooltip card (follow pointer)
                  const tooltip = btn.querySelector('.map-tooltip');
                  if (tooltip) {
                    gsap.to(tooltip, {
                      x: x * 1.5,
                      y: y * 1.5,
                      xPercent: -50,
                      duration: 0.2,
                      ease: "power2.out"
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  setIsHoveringMarker(false);
                  
                  // Reset outer circle
                  const circle = e.currentTarget.querySelector('.outer-circle');
                  if (circle) {
                    gsap.to(circle, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
                  }

                  // Reset tooltip card
                  const tooltip = e.currentTarget.querySelector('.map-tooltip');
                  if (tooltip) {
                    gsap.to(tooltip, { x: 0, y: 0, xPercent: -50, duration: 0.3, ease: "power2.out" });
                  }
                }}
                className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/pin z-10 hover:z-[60]"
                style={{ left: point.x, top: point.y }}
                aria-label={point.title}
              >
                {/* Core Circle */}
                <div className="w-2 h-2 bg-white rounded-full transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20"></div>

                {/* 3x Size Outer Circle (Magnetic & Beating) */}
                <span 
                  className="outer-circle absolute w-[20px] h-[20px] bg-white/30 rounded-full animate-pulse transition-opacity duration-300 group-hover/pin:animate-none group-hover/pin:bg-transparent group-hover/pin:border group-hover/pin:border-white z-10"
                  style={{ animationDuration: '4s' }}
                ></span>
                
                {/* Core Circle Glow (Ping) */}
                <span className="absolute inset-x-0 inset-y-0 rounded-full bg-white animate-ping opacity-20 group-hover/pin:opacity-0"></span>
                
                {/* Tooltip */}
                <div className="map-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-6 p-3 bg-white/[0.85] backdrop-blur-md text-[#30373C] rounded-md shadow-2xl opacity-0 invisible group-hover/pin:opacity-100 group-hover/pin:visible transition-all duration-300 pointer-events-none z-[50] w-[250px] text-left border border-white/20">
                  {point.image && (
                    <div className="mb-2.5 relative w-full aspect-video overflow-hidden rounded-sm bg-black/5">
                      <Image 
                        src={point.image} 
                        alt={point.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className={`font-bold mb-1 px-1 text-[#30373C] ${tenorSans.className}`}>{point.title}</div>
                  <div className="font-normal text-[10px] opacity-80 px-1 leading-relaxed">
                    {point.description}
                  </div>
                  {/* Arrow with balanced 4px gaps */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-[4px] border-[8px] border-transparent border-t-white/[0.85]"></div>
                </div>
              </button>
            ))}
          </div>

          {/* Instruction Text - Aligned with Header */}
          <div className="absolute bottom-[35%] left-6 flex items-center gap-3 opacity-40">
            <div className="w-8 h-[1px] bg-[#30373C]"></div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#30373C] font-bold">
              Hover on a marker to explore each stop
            </span>
          </div>

          <div className="mt-24 flex justify-between items-start gap-12">
            <p className="w-1/2 text-[#6B6560] text-base leading-relaxed">
              I firmly believe that no two travelers are the same, and your journey should be as unique as your own fingerprint. While I provide meticulously curated experiences and insider recommendations, the final itinerary always remains firmly in your hands. I understand that the best travel moments often happen in the unplanned gaps. perhaps you want to linger for an extra hour to capture the perfect light at a hidden waterfall, or maybe you’d prefer to skip a scheduled site to savor a long, lazy lunch at a local warung. My role is to provide the map, but you hold the compass.
            </p>
            <div className="flex-shrink-0">
              <a href="#" className="inline-block px-10 py-4 bg-[#2D2623] text-white rounded-full font-medium tracking-wide transition-all duration-300 hover:bg-[#3d3330] hover:translate-x-[-8px] shadow-sm hover:shadow-md">
                Discover All Spot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative h-[560px] flex flex-col justify-center items-center text-center text-white mb-20">
        <Image src='/tanah-lot.png' alt="Relaxing Bali View" fill className="object-cover z-0" />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 max-w-[600px] mx-auto px-6 flex flex-col items-center text-center">
          <h2 className={`text-5xl mb-6 ${tenorSans.className} leading-tight`}>Ready to See Bali Through a Local&#39;s Eyes?</h2>
          <p className="text-lg mb-10 opacity-90 leading-relaxed">
            Let&#39;s discuss your interests and create an itinerary that belongs only to you!
          </p>
          <a href="#" className="inline-block px-10 py-4 bg-white text-[#2D2623] rounded-full font-medium hover:bg-gray-100 transition-colors">Contact Me</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h3 className={`text-3xl mb-6 text-[#6B6560] ${tenorSans.className}`}>Vyan Abimanyu</h3>
              <p className="text-[#6B6560]">Bali, Indonesia<br />2026</p>
            </div>
            <div className="max-w-[400px] text-[#6B6560] leading-relaxed text-right">
              <p>Your local companion for a deeper connection. Dedicated to exploring the soul of Bali through the eyes of a friend, where every curated moment is anchored in safety, authenticity, and heart.</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-gray-500">
            <p>&copy; 2026 Web by <Link href="https://flaat.studio" target="_blank" rel="noopener noreferrer" className='font-semibold hover:text-[#2D2623] transition-colors'>Flaat Studio</Link></p>
            <div className="flex gap-4">
              <svg viewBox="0 0 24 24" className="w-4 h-4 cursor-pointer hover:text-[#2D2623] transition-colors" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <svg viewBox="0 0 24 24" className="w-4 h-4 cursor-pointer hover:text-[#2D2623] transition-colors" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-2.2 2.2c-3.23-1.61-5.99-4.36-7.61-7.59l2.2-2.21c.27-.26.35-.65.24-1C7.55 5.3 7.35 4.11 7.35 2.88 7.35 2.39 6.96 2 6.48 2H3.06c-1.12 0-2.14.94-2.02 2.1C1.96 14.54 10.45 23 20.9 23c1.17.12 2.1-.9 2.1-2.02v-3.46c0-.49-.39-.88-.89-.88zM7.17 14.5L5.7 13.03c1.2-1.2 2.6-2.2 4.2-3l1.5 1.5-4.23 2.97z"/>
              </svg>
              <svg viewBox="0 0 24 24" className="w-4 h-4 cursor-pointer hover:text-[#2D2623] transition-colors" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
