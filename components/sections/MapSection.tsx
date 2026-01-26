'use client'
import { useRef, useEffect, useState } from 'react'
import { Tenor_Sans, Montserrat } from 'next/font/google'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '@/lib/loading-context'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

const MAP_HOTSPOTS = [
  { id: 1, x: '50%', y: '22.4%', title: 'Banyumala Waterfall', description: 'A stunning twin waterfall featuring crystal-clear natural pools perfect for a refreshing swim in the jungle.', image: '/banyumala.webp' },
  { id: 2, x: '76.7%', y: '12.5%', title: 'Savana Tianyar', description: 'A vast, golden grassland at the foot of Mount Agung that offers a unique African-safari aesthetic in Bali.', image: '/tianyar.webp' },
  { id: 3, x: '69.5%', y: '41%', title: 'Tegallalang Rice Terrace', description: 'An iconic valley of lush green rice paddies utilizing the traditional Balinese Subak irrigation system.', image: "/tegallalang.webp" },
  { id: 4, x: '68.8%', y: '79.5%', title: 'Tegal Wangi Beach', description: 'A scenic coastal escape famous for its natural rock pools that serve as private oceanfront jacuzzis.', image: '/tegalwangi.png' },
  { id: 5, x: '66.5%', y: '94%', title: 'Uluwatu Temple', description: 'A majestic sea temple perched on a steep cliff edge, renowned for its sunset views and traditional Kecak fire dances.', image: '/tanah-lot.png' },
  { id: 6, x: '70.7%', y: '89.3%', title: 'Garuda Wisnu Kencana', description: 'A sprawling cultural park home to one of the world\'s tallest monumental statues of the Hindu god Vishnu.', image: '/gwk.webp' },
  { id: 7, x: '93%', y: '72.5%', title: 'Nusa Penida', description: 'An offshore island paradise known for its dramatic limestone cliffs and world-class snorkeling spots like Manta Point.', image: '/nusa-penida.webp' },
  { id: 8, x: '5%', y: '26%', title: 'West Bali National Park', description: 'A protected sanctuary of monsoon forests and mangroves that serves as the last refuge for the rare Bali Starling.', image: '/west-national.webp' },
  { id: 9, x: '60%', y: '68%', title: 'Tanah Lot', description: 'An ancient Hindu shrine set upon an offshore rock formation that becomes a dramatic silhouette during sunset.', image: '/tanah-lot.webp' },
  { id: 10, x: '69.5%', y: '52%', title: 'Ubud Palace', description: 'A historical landmark in the heart of Bali\'s cultural center featuring intricate architecture and royal dance performances.', image: "/ubud.webp" },
  { id: 11, x: '74%', y: '33%', title: 'Besakih Great Temple', description: 'Known as the "Mother Temple," this massive complex sits high on the slopes of Mount Agung as Bali\'s holiest site.', image: '/besakih.webp' },
  { id: 12, x: '68.95%', y: '87%', title: 'Cliff Jump Tegal Wangi Beach', description: 'A thrill-seeker\'s destination offering rugged limestone ledges for jumping into the turquoise Indian Ocean below.', image: '/cliff-jump.webp' }
];

export default function MapSection() {
  const { isLoading } = useLoading()
  const mapSectionRef = useRef<HTMLElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHoveringMarker, setIsHoveringMarker] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<typeof MAP_HOTSPOTS[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Custom cursor for map section (disable on mobile)
  useEffect(() => {
    // Media query check for cursor
    const mm = gsap.matchMedia()
    
    mm.add("(min-width: 768px)", () => {
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
      
      return () => {
        container.removeEventListener("mousemove", moveCursor)
      }
    })

    return () => mm.revert()
  }, [])

   // Custom "Close" cursor for modal
   useEffect(() => {
    if (!isModalOpen) return

    const modalCursor = document.createElement('div')
    modalCursor.textContent = 'Close'
    modalCursor.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      font-size: 18px;
      font-weight: 500;
      color: white;
      background: transparent;
      backdrop-filter: blur(8px);
      padding: 12px 24px;
      border-radius: 50px;
      border: 1px solid rgba(255, 255, 255, 0.8);
      transform: translate(-50%, -50%);
      font-family: 'Tenor Sans', serif;
      user-select: none;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    `
    document.body.appendChild(modalCursor)

    // GSAP quickTo for smoother cursor movement (same timing as search cursor)
    const xTo = gsap.quickTo(modalCursor, "left", { duration: 0.15, ease: "power3" })
    const yTo = gsap.quickTo(modalCursor, "top", { duration: 0.15, ease: "power3" })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const handleClick = () => {
      handleCloseModal()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
      if (document.body.contains(modalCursor)) {
          document.body.removeChild(modalCursor)
      }
    }
  }, [isModalOpen])

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLocation(null)
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  // Tours Section Text Entrance Animation
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set('.tours-title', {
        y: 40,
        opacity: 0
      })

      gsap.to('.tours-title', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapSectionRef.current,
          start: 'top 85%', // More reliable trigger point
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => ctx.revert()
  }, [isLoading])

  // Map Section Animations
  useEffect(() => {
    if (isLoading) return

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)",
    }, (context) => {
      const { isMobile, isDesktop } = context.conditions as { isMobile: boolean, isDesktop: boolean };

      // Map zoom in animation - ROLL FROM BACK TO FRONT (SLOWER)
      gsap.from('.map-image', {
        scale: 0.85,
        rotationY: 25, // Positive rotation = roll from back to front
        opacity: 0,
        ease: 'none', // No easing for scrub animation
        scrollTrigger: {
          trigger: mapSectionRef.current,
          start: 'top 80%', // Start earlier for smoother entrance
          end: 'top 15%', // Extended range for slower animation
          scrub: 3, // Increased scrub for slower, smoother animation
        }
      })

      // Markers stagger animation - Smoother on mobile
      gsap.from('.map-marker', {
        scale: isMobile ? 0.5 : 0,
        y: isMobile ? 10 : 0,
        opacity: 0,
        duration: isMobile ? 0.8 : 0.6,
        stagger: isMobile ? 0.05 : 0.08,
        ease: isMobile ? 'power2.out' : 'back.out(1.7)',
        scrollTrigger: {
          trigger: mapContainerRef.current,
          start: isMobile ? 'top 70%' : 'top 55%', // Earlier trigger on mobile
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => mm.revert()
  }, [isLoading])


  return (
    <>
      <section ref={mapSectionRef} className="py-20 md:py-28 mb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-[60px] relative">
          <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-0">
            <h2 className={`tours-title text-4xl md:text-[64px] leading-tight max-w-[400px] text-[#30373C] ${tenorSans.className} opacity-0`}>
              Explore Our Tour
            </h2>

            {/* Instruction Text - Top Right */}
            <div className="flex items-center gap-3 opacity-40 mt-4 hidden md:flex">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#30373C] font-bold text-right">
                Hover or click on a marker <br/>to explore each stop
              </span>
              <div className="w-8 h-[1px] bg-[#30373C]"></div>
            </div>

            {/* Mobile Instruction Text */}
            <div className="flex items-center gap-3 opacity-60 md:hidden">
              <span className="text-xs uppercase tracking-[0.15em] text-[#30373C] font-bold">
                Tap markers to explore
              </span>
              <div className="w-6 h-[1px] bg-[#30373C]"></div>
            </div>
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
              src="/assets/3dmap-2.webp" 
              alt='map' 
              width={800} 
              height={800} 
              sizes="(max-width: 768px) 100vw, 800px"
              className="w-full h-full object-cover map-image"
            />
            
            {/* Hotspots */}
            {MAP_HOTSPOTS.map((point) => (
              <button
                key={point.id}
                className="map-marker absolute w-2 h-2 md:w-6 md:h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/pin z-10 hover:z-[60] cursor-none"
                style={{ left: point.x, top: point.y }}
                aria-label={point.title}
                onClick={() => {
                  setSelectedLocation(point)
                  setIsModalOpen(true)
                }}
                onMouseEnter={() => setIsHoveringMarker(true)}
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
              >
                {/* Core Circle */}
                <div className="w-2 h-2 bg-white rounded-full transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 pointer-events-none"></div>

                {/* 3x Size Outer Circle (Magnetic & Beating) - Interactive */}
                <span 
                  className="outer-circle absolute w-[8px] h-[8px] md:w-[20px] md:h-[20px] bg-white/30 rounded-full animate-pulse transition-opacity duration-300 group-hover/pin:animate-none group-hover/pin:bg-transparent group-hover/pin:border group-hover/pin:border-white z-10 cursor-none pointer-events-none md:pointer-events-auto"
                  style={{ animationDuration: '4s' }}
                  onMouseMove={(e) => {
                    const btn = e.currentTarget.closest('button');
                    if (!btn) return;
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - (rect.left + rect.width / 2);
                    const y = e.clientY - (rect.top + rect.height / 2);
                    
                    // Move outer circle
                    const circle = btn.querySelector('.outer-circle');
                    if (circle) {
                      gsap.to(circle, {
                        x: x * 0.20,
                        y: y * 0.20,
                        duration: 0.2,
                        ease: "power2.out"
                      });
                    }

                    // Move tooltip card (follow pointer)
                    const tooltip = btn.querySelector('.map-tooltip');
                    if (tooltip) {
                      gsap.to(tooltip, {
                        x: x * 0.5,
                        y: y * 0.5,
                        xPercent: -50,
                        duration: 0.1,
                        ease: "power2.out"
                      });
                    }
                  }}
                ></span>
                
                {/* Core Circle Glow (Ping) */}
                <span className="absolute inset-x-0 inset-y-0 rounded-full bg-white animate-ping opacity-20 group-hover/pin:opacity-0"></span>
                
                {/* Tooltip */}
                <div className="map-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-6 p-3 bg-white/[0.85] backdrop-blur-md text-[#30373C] rounded-md shadow-2xl opacity-0 invisible group-hover/pin:opacity-100 group-hover/pin:visible transition-opacity duration-300 pointer-events-none z-[50] w-[250px] text-left border border-white/20">
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

          <div className="mt-40 flex flex-col md:flex-row justify-start items-start gap-12 md:gap-8 relative">
            {/* Link anchored left/bottom */}
            <div className="md:w-1/4">
              <Link href="/destination" className="group inline-flex items-center gap-2">
                <span className={`text-lg text-[#30373C] ${tenorSans.className} border-b border-[#30373C] pb-0.5`}>
                  Discover All Spots
                </span>
                <span className={`text-lg text-[#30373C] ${tenorSans.className} pb-0.5 transition-transform duration-300 group-hover:translate-x-1`}>
                  →
                </span>
              </Link>
            </div>

            {/* Paragraph left-aligned */}
            <div className="md:w-2/3">
              <p className="text-[#30373C] text-base md:text-lg leading-[1.8] font-light text-left">
                No two travelers are the same. And your Bali should be too.
                I’ll share my favorite spots and quiet corners, but the final plan? That’s yours.
Because the best moments usually happen when you’re not following a script.
                <span className="block mt-6 text-[#6B6560] text-sm md:text-base">
                  I understand that the best travel moments often happen in the unplanned gaps.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Preview Modal */}
      <AnimatePresence>
        {isModalOpen && selectedLocation && (
          <motion.div
          className="fixed inset-0 z-[1000] flex items-end justify-center"
          onClick={handleCloseModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full h-screen bg-black cursor-none"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Full Screen Image */}
            <div className="relative w-full h-full">
              <Image
                src={selectedLocation.image}
                alt={selectedLocation.title}
                fill
                className="object-cover"
                priority
              />

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-transparent/50 to-transparent" />

              {/* Content Container */}
              <div className="absolute inset-x-0 bottom-0 max-w-[1400px] mx-auto px-6 lg:px-[60px] pb-8 md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
                {/* Title - Bottom Left */}
                <motion.div
                  className="flex-shrink-0 w-full md:w-[600px]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className={`text-4xl md:text-[64px] leading-tight text-white ${tenorSans.className}`}>
                    {selectedLocation.title}
                  </h2>
                </motion.div>

                {/* Description - Bottom Right */}
                <motion.div
                  className="max-w-full md:max-w-[300px] text-left md:text-right"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <p className={`text-white/90 text-base leading-relaxed ${montserrat.className} text-sm md:text-base`}>
                    {selectedLocation.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}
