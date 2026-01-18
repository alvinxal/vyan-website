'use client'
import { Tenor_Sans, Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import FAQItem from '@/components/FAQItem'

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

const GUIDE_STEPS = [
  { id: 0, image: '', location: '', description: '' },
  { id: 1, image: '/vyan.webp', location: '', description: 'As a local born among the emerald rice fields, I provide more than a tour. I provide a connection to Bali\'s living culture. I am passionate about sharing the delicate balance between our ancestral heritage and the island\'s breathtaking landscapes. You are a welcomed guest invited to experience the quiet magic of my home. Let\'s create an unforgettable journey together.' },
  { id: 2, image: '/testi-1.webp', location: 'Garuda Wisnu Kencana', description: 'Experience the magic of Uluwatu\'s towering cliffs and the mesmerizing Kecak Fire Dance at sunset. I\'ll take you to hidden spots for the best ocean views that most tourists miss.' },
  { id: 3, image: '/testi-2.webp', location: 'Bali VW Safari Tour', description: 'Explore the cool highlands of Kintamani. Contrast the black lava fields of Mount Batur with the serene beauty of the lake, followed by a local coffee tasting overlooking the volcano.' },
  { id: 4, image: '/testi-3.webp', location: 'Atlas Beach Club', description: 'Immerse yourself in the vibrant laid-back atmosphere of Canggu. From world-class surf breaks to the trendiest beach clubs and hidden cafes, experience the modern side of Bali\'s coast.' },
]

const FAQ_ITEMS = [
  { 
    id: 1, 
    question: 'How do I book a tour with you?', 
    answer: 'Simply reach out via WhatsApp or Instagram, and we\'ll discuss your interests, preferred dates, and create a personalized itinerary that matches your travel style and budget.' 
  },
  { 
    id: 2, 
    question: 'What\'s included in the tour price?', 
    answer: 'All tours include private transportation, an English-speaking local guide (me!), entrance fees to attractions, and bottled water. Meals can be included based on your preference and will be discussed during planning.' 
  },
  { 
    id: 3, 
    question: 'Can you customize the itinerary?', 
    answer: 'Absolutely! Every traveler is unique, and I believe your journey should reflect that. Whether you want to add extra stops, skip certain locations, or spend more time at a particular spot, I\'m completely flexible.' 
  },
  { 
    id: 4, 
    question: 'Do you offer multi-day tours?', 
    answer: 'Yes! I offer both single-day and multi-day tour packages. Multi-day tours can include accommodation recommendations, inter-island trips to Nusa Penida or the Gili Islands, and comprehensive cultural experiences.' 
  },
  { 
    id: 5, 
    question: 'What should I bring on the tour?', 
    answer: 'Comfortable walking shoes, sunscreen, a hat, and your camera are essentials. For temple visits, bring a sarong (or I can provide one). I\'ll send you a detailed packing list based on our planned activities.' 
  },
]

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// export const metadata: Metadata = {
//   title: 'Vyan Abimanyu | Bali Local Guide',
//   description: 'Experience the soul of Bali with Vyan Abimanyu, a local friend who knows every hidden corner of the island.',
// }

const ICON_PATH_MAIN = "M287 111.468C273.947 113.913 263.23 123.314 253 131.116C238.82 141.93 224.765 152.013 207 155.789C194.801 158.383 178.807 159.462 167 154.743C156.571 150.575 147.837 142.67 137 139.44C117.193 133.537 96.9781 135.018 77 131.195C71.4159 130.127 66.0498 128.535 61 125.88C56.4255 123.474 52.206 120.241 47 119.329C42.2968 118.504 36.7059 118.849 33.7423 123.109C31.124 126.872 31.4419 133.185 33.7384 137C35.2779 139.557 38.3732 141.775 38.4182 145C38.4974 150.677 34.2829 154.667 35.4676 161C38.7452 178.523 54.6144 193.04 64.5725 207C69.0795 213.318 71.7658 221.31 77.1852 226.895C84.1875 234.111 93.5579 235 103 235C117.949 235 134.518 230.628 149 235.36C158.714 238.533 164.904 247.47 174 252.029C184.762 257.423 197.455 258.707 207.907 264.684C214.822 268.638 219.563 277.126 226 282.112C238.889 292.095 253.464 299.629 265.996 310.084C269.903 313.343 273.437 316.913 276.485 321C286.163 333.975 283.407 349.634 275.961 363C272.273 369.62 266.065 376.221 265.189 384C263.346 400.371 285.393 402.414 297 400.699C299.412 400.343 301.801 399.656 304 398.597C318.825 391.459 311.499 377.604 314.394 365C315.881 358.53 322.179 354.828 324.95 349C330.388 337.56 326.846 325.715 337.015 316.093C350.261 303.56 367.894 305.06 384 299.302C387.972 297.882 391.781 296.05 394.671 292.895C398.812 288.374 400.711 282.477 406.015 278.969C414.952 273.057 426.45 270.652 436 265.741C443.982 261.636 450.312 255.19 458 250.604C465.1 246.369 474.581 243.908 478.543 236C479.805 233.481 479.989 230.768 479.992 228C480.018 207.716 457.36 207.039 446.616 193.999C438.129 183.7 432.307 172.122 422 163.3C412.811 155.435 400.257 147.295 389 142.779C384.138 140.828 378.86 140.207 374 138.127C365.221 134.371 357.138 128.933 348 126.029C342.758 124.363 337.077 124.989 332 123.298C326.747 121.548 322.084 117.603 317 115.312C307.85 111.187 296.944 109.604 287 111.468z"
const ICON_PATH_DETAIL = "M263 123L264 124L263 123M61 126L62 127L61 126M78 131L79 132L78 131M239 141L240 142L239 141M236 143L237 144L236 143M149 145L150 146L149 145M221 151L222 152L221 151M163 153L164 154L163 153M55 194L56 195L55 194M83 231L84 232L83 231M85 232L86 233L85 232M475 240L476 241L475 240M203 262L204 263L203 262M401 282L402 283L401 282M250 298L251 299L250 298M253 300L254 301L253 300M256 302L257 303L256 302M270 313L271 314L270 313M339 313L340 314L339 313M271 314L272 315L271 314z"
const ICON_PATH_ISLAND = "M428 332.468C421.926 332.886 412.471 331.294 407 334.028C403.551 335.751 401.089 339.11 398 341.367C394.652 343.812 390.485 345.536 389.474 350.004C387.981 356.599 393.636 360.08 397.91 363.609C401.278 366.389 403.191 370.654 407.04 372.86C411.676 375.518 416.725 375.54 420.985 379.214C425.698 383.277 429.763 390.386 436.996 389.677C442.624 389.126 443.194 383.909 445.727 380C447.806 376.792 451.111 374.458 452.82 371C457.426 361.683 444.434 354.879 440.533 348C436.971 341.718 437.83 331.792 428 332.468z"

export default function AlternativePage() {
  const guideSectionRef = useRef<HTMLElement>(null)
  const guideTrackRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapSectionRef = useRef<HTMLElement>(null)
  const ctaSectionRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHoveringMarker, setIsHoveringMarker] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState<typeof MAP_HOTSPOTS[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openFaqId, setOpenFaqId] = useState<number | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simulate loading with ultra-smooth progress using requestAnimationFrame
    let startTime: number | null = null
    const duration = 4000 // 4 seconds total

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Linear progress for perfect sync with SVG fill
      const percentage = Math.round(progress * 100)
      setLoadingProgress(percentage)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Pause at 100% before transitioning out
        setTimeout(() => {
          setIsLoading(false)
        }, 500) // 500ms pause at 100%
      }
    }

    requestAnimationFrame(animate)

    return () => {
      startTime = null
    }
  }, [])

  // Custom cursor for map section
  useEffect(() => {
    if (isLoading) return
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
  }, [isLoading])

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
      document.body.removeChild(modalCursor)
    }
  }, [isModalOpen])

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLocation(null)
  }

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

  // Guide Section Text Entrance Animation
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(['.guide-subtitle', '.guide-title-line-1', '.guide-title-line-2'], {
        y: 30,
        opacity: 0
      })

      // Create timeline for staggered entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: guideSectionRef.current,
          start: 'top 85%', // More reliable trigger point
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      })

      // Staggered entrance animation
      tl.to('.guide-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to('.guide-title-line-1', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4') // Slight overlap
      .to('.guide-title-line-2', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6') // More overlap for smoother flow
    })

    return () => ctx.revert()
  }, [isLoading])

  // Guide Section Horizontal Scroll Animation
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.guide-slide') as HTMLElement[]
      const texts = gsap.utils.toArray('.guide-text') as HTMLElement[]
      const track = guideTrackRef.current

      if (!track || slides.length === 0) return

      // Start with the first image (slides[1]) centered and expanded
      const startX = window.innerWidth / 2 - (1 * 224 + 220)
      gsap.set(track, { x: startX })

      // ENTRANCE ANIMATION: Blur Fade-In for all images
      slides.forEach((slide, i) => {
        if (i === 0) return // Skip empty placeholder
        
        gsap.set(slide, {
          opacity: 0,
          filter: 'blur(20px)'
        })
      })

      // Staggered blur fade-in entrance
      gsap.to(slides, {
        opacity: (i) => i === 0 ? 0 : (i === 1 ? 1 : 0.5), // slides[1] full opacity, others 0.5
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: guideSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })

      // Set initial states: slides[1] expanded, others normal (after entrance)
      gsap.set(slides[1], {
        width: 440,
        height: 550,
        marginTop: 0
      })
      gsap.set(texts[1], {
        opacity: 1,
        y: 0
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: guideSectionRef.current,
          start: 'top top',
          end: () => `+=${(slides.length - 1) * window.innerHeight * 0.6}`, // Adjust for starting at slide 1
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (slides.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: 'power2.inOut'
          },
          onUpdate: (self) => {
            const slideIndex = Math.round(self.progress * (slides.length - 1)) + 1 // Start from 1
            setCurrentSlide(Math.max(1, Math.min(slideIndex, slides.length - 1)))
          }
        }
      })

      // Start with slides[1] already expanded, then transition to slides[2], etc.
      slides.forEach((slide, i) => {
        if (i < 1 || i === slides.length - 1) return // Skip slides[0] and last slide

        const currentI = i
        const nextI = i + 1
        const nextSlide = slides[nextI]
        const targetX = window.innerWidth / 2 - (nextI * 224 + 220)
        const startTime = (i) * 2 // Adjust timing since we start from slide 1

        tl.to(track, {
          x: targetX,
          duration: 2,
          ease: 'power2.inOut'
        }, startTime)
        .to(slide, {
          width: 200,
          height: 240,
          marginTop: 310,
          opacity: 0.5,
          duration: 2,
          ease: 'power2.inOut'
        }, startTime)
        .to(nextSlide, {
          width: 440,
          height: 550,
          marginTop: 0,
          opacity: 1,
          duration: 2,
          ease: 'power2.inOut'
        }, startTime)
        .to(texts[currentI], { opacity: 0, y: -20, duration: 0.5 }, startTime)
        .to(texts[nextI], { opacity: 1, y: 0, duration: 0.5 }, startTime + 1)
      })

    }, guideSectionRef)

    return () => ctx.revert()
  }, [isLoading])

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

    const ctx = gsap.context(() => {
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

      // Markers stagger animation - SHOW EARLIER
      gsap.from('.map-marker', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: mapContainerRef.current,
          start: 'top 55%', // Earlier trigger - show while map is growing
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => ctx.revert()
  }, [isLoading])

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


  // Footer Reveal Animation
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Social icons stagger
      gsap.from('.social-icon', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => ctx.revert()
  }, [isLoading])

  // FAQ Section Animation
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      gsap.from('.faq-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.faq-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => ctx.revert()
  }, [isLoading])

  // Main page content
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          className={`${montserrat.className} bg-[#F8F5F0] text-white leading-relaxed overflow-x-hidden bg-grain`}
          exit={{
            y: "100vh",
            opacity: 0,
            transition: {
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
          layout
        >
          <motion.div
            className="fixed inset-0 z-[99999] bg-[#F8F5F0] flex flex-col items-center justify-center text-[#2D2623]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="relative w-56 h-56 mb-8">
                {/* Outline Layer (Border) */}
                <svg viewBox="0 0 512 512" className="absolute inset-0 w-full h-full z-20" fill="none" stroke="#2D2623" strokeWidth="6">
                  <path d={ICON_PATH_MAIN} />
                  <path d={ICON_PATH_DETAIL} />
                  <path d={ICON_PATH_ISLAND} />
                </svg>

                {/* Fill Layer Container (Masked) */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full overflow-hidden z-10"
                  style={{
                    height: `${loadingProgress}%`
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${loadingProgress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                >
                  {/* Inner SVG (Filled - No Gap) */}
                  <div className="absolute bottom-0 left-0 w-full h-56">
                    <svg viewBox="0 0 512 512" className="w-full h-full" fill="#2D2623" stroke="none">
                      <path d={ICON_PATH_MAIN} />
                      <path d={ICON_PATH_DETAIL} />
                      <path d={ICON_PATH_ISLAND} />
                    </svg>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className={`text-lg font-medium tracking-widest ${montserrat.className}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                {Math.round(loadingProgress)}%
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className={`${montserrat.className} bg-[#F8F5F0] text-white leading-relaxed overflow-x-hidden bg-grain`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
      {/* Header */}
      <motion.header 
        className="absolute inset-x-0 top-0 z-10 py-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-[60px] flex justify-between items-center">
          <motion.div 
            className={`header-logo text-xl font-bold ${tenorSans.className}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Vyan Abimanyu
          </motion.div>
          <nav className="flex gap-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Link href="/destination" className="header-nav-item header-nav-1 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
                Destination
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/inquiry" className="header-nav-item header-nav-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
                Inquiry
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center z-0 mb-20">
        <div className="max-w-6xl mx-auto px-6 z-10 -translate-y-[30%] text-white">
          <h1 className={`text-6xl leading-tight mb-6 mx-auto ${tenorSans.className}`}>
            <motion.span 
              className="hero-heading-line-1 block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Experience the Soul of Bali,
            </motion.span>
            <motion.span 
              className="hero-heading-line-2 block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Not Just the Sights
            </motion.span>
          </h1>
          <motion.p 
            className="hero-paragraph max-w-lg mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            Custom tailored private tours with a local friend <br /> who knows every hidden corner of the island.
          </motion.p>
          <motion.a 
            href="#" 
            className="hero-button group relative inline-flex items-center justify-center px-12 py-5 border border-white rounded-full overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.15, ease: "easeOut" }
            }}
          >
            <motion.span 
              className={`relative z-10 text-lg font-medium tracking-wide ${tenorSans.className}`}
              initial={{ color: "#ffffff" }}
              whileHover={{ color: "#000000" }}
              transition={{ duration: 0.3 }}
            >
              Chat With Vyan
            </motion.span>
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>

        {/* Location Indicator */}
        <motion.div 
          className="hero-location absolute bottom-12 inset-x-0 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-[60px] flex items-center gap-3 text-white/90">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-[11px] tracking-normal uppercase font-semibold">Nusa Penida, Bali</span>
          </div>
        </motion.div>

          <motion.div 
            className="hero-video absolute inset-0 z-[-1] will-change-transform"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
          <video 
            src="/assets/nusa.webm" 
            className="w-full h-full object-cover will-change-transform" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="metadata" 
          />
          <div className="absolute inset-0 bg-black/40 will-change-transform" />
        </motion.div>
      </section>

      {/* Guide Section */}
      <section ref={guideSectionRef} className="pt-12 pb-20 overflow-hidden min-h-screen flex flex-col justify-start relative">
        {/* Text Content within centered container */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-[60px] relative z-20 w-full">
          <div className="flex-shrink-0">
            <div className="mb-12 flex items-start justify-between">
              <div>
                <span className="guide-subtitle block mb-4 text-[#6B6560] text-left opacity-0">Meet Your Guide</span>
                <h2 className={`text-[64px] leading-tight text-left text-[#30373C] ${tenorSans.className} w-[600px]`}>
                  <span className="guide-title-line-1 block opacity-0">A Local Journey</span>
                  <span className="guide-title-line-2 block opacity-0">With Me</span>
                </h2>
              </div>
              
              {/* Progress Indicator - Slide Counter */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-semibold text-[#30373C] tabular-nums">
                  {currentSlide}/{GUIDE_STEPS.length - 1}
                </span>
              </div>
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
              className={`guide-slide flex-shrink-0 w-[200px] h-[240px] rounded-sm overflow-hidden relative mt-[310px] origin-bottom opacity-50 ${step.image ? 'bg-black/5 hover:scale-105 transition-transform duration-300' : ''}`}
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
      <section ref={mapSectionRef} className="py-28 mb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-[60px] relative">
          <div className="mb-12 flex justify-between items-start">
            <h2 className={`tours-title text-[64px] leading-tight max-w-[400px]  text-[#30373C] ${tenorSans.className} opacity-0`}>
              Explore Our Tour
            </h2>
            
            {/* Instruction Text - Top Right */}
            <div className="flex items-center gap-3 opacity-40 mt-4 hidden md:flex">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#30373C] font-bold text-right">
                Hover or click on a marker <br/>to explore each stop
              </span>
              <div className="w-8 h-[1px] bg-[#30373C]"></div>
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
              className="w-full h-full object-cover map-image"
            />
            
            {/* Hotspots */}
            {MAP_HOTSPOTS.map((point) => (
              <button
                key={point.id}
                className="map-marker absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/pin z-10 hover:z-[60] cursor-none"
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
                  className="outer-circle absolute w-[20px] h-[20px] bg-white/30 rounded-full animate-pulse transition-opacity duration-300 group-hover/pin:animate-none group-hover/pin:bg-transparent group-hover/pin:border group-hover/pin:border-white z-10 cursor-none"
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



          <div className="mt-40 flex flex-col md:flex-row justify-between items-end gap-12 md:gap-0 relative">
            {/* Link anchored left/bottom */}
            <div className="md:w-1/4">
              <Link href="/destination" className="group inline-flex items-center gap-2">
                <span className={`text-lg text-[#30373C] ${tenorSans.className} border-b border-[#30373C] pb-0.5`}>
                  Discover All Spots
                </span>
                <motion.span 
                  initial={{ x: 0, scale: 1 }}
                  whileHover={{ x: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </Link>
            </div>

            {/* Paragraph offset to the right */}
            <div className="md:w-2/3 md:pl-20">
              <p className="text-[#30373C] text-base md:text-lg leading-[1.8] font-light">
                I firmly believe that no two travelers are the same, and your journey should be as unique as your own fingerprint. While I provide meticulously curated experiences and insider recommendations, the final itinerary always remains firmly in your hands. 
                <span className="block mt-6 text-[#6B6560] text-sm md:text-base">
                  I understand that the best travel moments often happen in the unplanned gaps.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-32 bg-white relative z-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="mb-20 text-center">
            <span className="faq-subtitle block mb-4 text-[#6B6560] text-sm uppercase tracking-widest font-medium">Common Questions</span>
            <h2 className={`faq-title text-6xl leading-tight text-[#30373C] ${tenorSans.className}`}>
              Frequently Asked<br/>Questions
            </h2>
          </div>

          <div className="space-y-6">
            {FAQ_ITEMS.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={index}
                isOpen={openFaqId === faq.id}
                onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <h2 className={`text-6xl mb-8 ${tenorSans.className} leading-tight drop-shadow-lg`}>
              Ready to See Bali <br/> Through a Local&#39;s Eyes?
            </h2>
            <p className={`text-base mb-12 opacity-90 leading-relaxed max-w-2xl mx-auto ${montserrat.className} drop-shadow-md`}>
              Let&#39;s craft a story that belongs only to you. No rushed schedules, just authentic moments and hidden gems.
            </p>
            <Link href="/inquiry" className="group relative inline-flex items-center justify-center px-12 py-5 bg-[#F8F5F0] text-[#2D2623] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl">
              <span className={`relative z-10 text-lg font-medium tracking-wide ${tenorSans.className}`}>Let&#39;s Talk</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="py-20 px-6 lg:px-[60px] border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="footer-content flex justify-between items-start mb-16">
            <div>
              <h3 className={`text-3xl mb-6 text-[#6B6560] ${tenorSans.className}`}>Vyan Abimanyu</h3>
              <p className="text-[#6B6560]">Bali, Indonesia</p>
            </div>
            <div className="max-w-[400px] text-[#6B6560] leading-relaxed text-right">
              <p>Your local companion for a deeper connection. Dedicated to exploring the soul of Bali through the eyes of a friend, where every curated moment is anchored in safety, authenticity, and heart.</p>
            </div>
          </div>
          <div className="footer-content flex justify-between items-center text-gray-500">
             <p>&copy; 2026 Web by <Link href="https://flaat.studio" target="_blank" rel="noopener noreferrer" className='font-semibold hover:text-[#2D2623] transition-colors'>Flaat Studio</Link></p>
            <div className="flex gap-6">
              <Instagram className="social-icon w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
              <Facebook className="social-icon w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
              <Twitter className="social-icon w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </footer>

      {/* Location Preview Modal */}
      <AnimatePresence>
        {isModalOpen && selectedLocation && (
          <motion.div
          className="fixed inset-0 z-[99] flex items-end justify-center"
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
              <div className="absolute inset-x-0 bottom-0 max-w-[1400px] mx-auto px-6 lg:px-[60px] pb-16 flex items-end justify-between gap-8">
                {/* Title - Bottom Left */}
                <motion.div
                  className="flex-shrink-0 w-[600px]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className={`text-[64px] leading-tight text-white ${tenorSans.className}`}>
                    {selectedLocation.title}
                  </h2>
                </motion.div>

                {/* Description - Bottom Right */}
                <motion.div
                  className="max-w-[300px] text-right"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <p className={`text-white/90 text-base leading-relaxed ${montserrat.className}`}>
                    {selectedLocation.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
