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


export default function AlternativePage() {
  const { isLoading } = useLoading()
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0)
  const mobileGuideContainerRef = useRef<HTMLDivElement>(null)

  // Custom cursor for map section (disable on mobile)
  useEffect(() => {
    if (!cursorRef.current || !mapContainerRef.current || window.innerWidth < 768) return

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
    // Only initialize Lenis after loading is complete
    if (isLoading) return

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
  }, [])

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile Guide Slide Animations
  useEffect(() => {
    if (isLoading || !isMobileView) return

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.guide-slide-mobile') as HTMLElement[]

      // Animate each slide when it enters viewport
      slides.forEach((slide, index) => {
        gsap.fromTo(slide,
          {
            scale: 0.85,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slide,
              start: 'left 85%',
              end: 'left 15%',
              toggleActions: 'play none none reverse',
              onEnter: () => {
                setMobileSlideIndex(index)
              },
              onEnterBack: () => {
                setMobileSlideIndex(index)
              }
            }
          }
        )
      })
    })

    return () => ctx.revert()
  }, [isMobileView])

  // Guide Section Horizontal Scroll Animation (Desktop only)
  useEffect(() => {
    if (isLoading || isMobileView) return

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
        opacity: 0,
        y: 30
      })

      // Animate the first text separately on entrance
      gsap.to(texts[1], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: guideSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
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
  }, [])

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
  }, [])

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
  }, [])

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
  }, [])


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
          start: 'top bottom',
          toggleActions: 'play none none none'
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
          start: 'top bottom',
          toggleActions: 'play none none none'
        }
      })
    })

    return () => ctx.revert()
  }, [])

  // FAQ Section Animation - HEADER FIRST, THEN ITEMS SEQUENTIALLY
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      // Set initial states for FAQ header and item containers
      gsap.set(['.faq-subtitle', '.faq-title', '.faq-item-container'], {
        y: 30,
        opacity: 0
      })

      // Create timeline for sequential entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.faq-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Header appears first
      tl.to('.faq-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to('.faq-title', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4') // Slight overlap for smoother flow
      
      // FAQ items appear after header
      tl.to('.faq-item-container', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '+=0.2') // Small delay after header
    })

    return () => ctx.revert()
  }, [])

  // Main page content
  return (
    <div className={`${montserrat.className} bg-[#F8F5F0] text-white leading-relaxed overflow-x-hidden bg-grain`}>
      {/* Header */}
      <motion.header
        className="absolute top-0 w-full flex justify-between items-center px-6 lg:px-[60px] py-10 z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
       <Link href="/" className={`text-xl md:text-2xl font-normal tracking-wide text-white ${tenorSans.className}`}>
          Vyan Abimanyu
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10">
          {['Destination', 'Inquiry'].map((item, index) => (
            <motion.a
              key={item}
              href={item === 'Inquiry' ? '/inquiry' : '/destination'}
              className="text-white text-sm font-normal hover:opacity-70 transition-opacity"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 relative">
            <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
            <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'} translate-y-0`}></span>
            <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <motion.nav
                className="flex flex-col items-center justify-center h-full space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {['Destination', 'Inquiry'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={item === 'Inquiry' ? '/inquiry' : '/destination'}
                    className={`text-white text-lg font-normal hover:opacity-70 transition-opacity ${tenorSans.className}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center z-0 mb-20">
        <div className="max-w-6xl mx-auto px-6 z-10 text-white">
          <h1 className={`text-4xl md:text-6xl leading-tight mb-6 mx-auto ${tenorSans.className}`}>
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
            className="hero-paragraph max-w-4xl mx-auto mb-10 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            Custom tailored private tours with a local friend <br className="hidden md:block" /> who knows every hidden corner of the island.
          </motion.p>
          <motion.a
            href="#"
            className="hero-button group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 border border-white rounded-full overflow-hidden"
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
              className={`relative z-10 text-base md:text-lg font-medium tracking-wide ${tenorSans.className}`}
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
        
        {/* Desktop: GSAP Horizontal Scroll Animation */}
        {!isMobileView && (
          <>
            {/* Text Content within centered container */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-[60px] relative z-20 w-full">
              <div className="flex-shrink-0">
                <div className="mb-12 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-0">
                  <div>
                    <span className="guide-subtitle block mb-4 text-[#6B6560] text-left opacity-0">Meet Your Guide</span>
                    <h2 className={`text-4xl md:text-[64px] leading-tight text-left text-[#30373C] ${tenorSans.className} md:w-[600px]`}>
                      <span className="guide-title-line-1 block opacity-0">A Local Journey</span>
                      <span className="guide-title-line-2 block opacity-0">With Me</span>
                    </h2>
                  </div>

                  {/* Progress Indicator - Slide Counter */}
                  <div className="flex items-center gap-2 md:mt-2">
                    <span className="text-sm font-semibold text-[#30373C] tabular-nums">
                      {currentSlide}/{GUIDE_STEPS.length - 1}
                    </span>
                  </div>
                </div>
                {/* Dynamic Text Area */}
                <div className="relative h-[120px] max-w-[320px] md:max-w-none">
                  {GUIDE_STEPS.map((step) => (
                    <div key={step.id} className="guide-text absolute top-0 left-0 opacity-0 translate-y-4">
                      {step.location && <div className={`text-lg md:text-xl mb-2 text-[#30373C] ${tenorSans.className}`}>{step.location}</div>}
                      {step.description && <p className="text-[#6B6560] leading-relaxed text-sm md:text-base md:w-[340px]">{step.description}</p>}
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
                  className={`guide-slide flex-shrink-0 w-[200px] h-[240px] rounded-sm overflow-hidden relative mt-[310px] origin-bottom opacity-50 ${step.image ? 'bg-black/5 transition-transform duration-300' : ''}`}
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
          </>
        )}

        {/* Mobile: Horizontal Scrollable Layout */}
        {isMobileView && (
          <div className="max-w-[1400px] mx-auto px-6 lg:px-[60px] relative z-20 w-full">
            <div className="mb-8">
              <span className="guide-subtitle block mb-4 text-[#6B6560] text-sm uppercase tracking-widest font-medium">Meet Your Guide</span>
              <h2 className={`text-4xl leading-tight text-[#30373C] ${tenorSans.className}`}>
                A Local Journey
                <br />
                With Me
              </h2>
            </div>

            {/* Horizontal Scrollable Container */}
            <div className="relative overflow-x-auto overflow-y-hidden">
              <div className="flex gap-4 px-4" style={{ width: `${GUIDE_STEPS.slice(1).length * 100}%` }}>
                {GUIDE_STEPS.slice(1).map((step, index) => (
                  <div 
                    key={step.id} 
                    className={`guide-slide-mobile flex-shrink-0 w-full opacity-0 scale-80`}
                    style={{ width: '85%' }}
                  >
                    <div className="flex flex-col gap-4 items-start">
                      {/* Mobile Image */}
                      {step.image && (
                        <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-black/5">
                          <Image
                            src={step.image}
                            alt={step.location || `Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 85vw"
                          />
                          <div className="absolute inset-0 bg-black/10 transition-opacity"></div>
                        </div>
                      )}

                      {/* Mobile Text */}
                      <div>
                        {step.location && (
                          <div className={`text-xl mb-3 text-[#30373C] ${tenorSans.className}`}>
                            {step.location}
                          </div>
                        )}
                        {step.description && (
                          <p className="text-[#6B6560] leading-relaxed text-base">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {GUIDE_STEPS.slice(1).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const container = document.querySelector('.overflow-x-auto')
                    if (container) {
                      const targetSlide = document.querySelectorAll('.guide-slide-mobile')[index]
                      targetSlide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    mobileSlideIndex === index 
                      ? 'bg-[#30373C] w-8' 
                      : 'bg-[#30373C]/30 hover:bg-[#30373C]/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Tours Section */}
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



          <div className="mt-40 flex flex-col md:flex-row justify-start items-start gap-12 md:gap-8 relative">
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
                  <span className={`text-lg text-[#30373C] ${tenorSans.className} pb-0.5`}>→</span>
                </motion.span>
              </Link>
            </div>

            {/* Paragraph left-aligned */}
            <div className="md:w-2/3">
              <p className="text-[#30373C] text-base md:text-lg leading-[1.8] font-light text-left">
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
      <section className="faq-section py-20 md:py-32 bg-white relative z-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="mb-12 md:mb-20 text-center">
            <span className="faq-subtitle block mb-4 text-[#6B6560] text-sm uppercase tracking-widest font-medium">Common Questions</span>
            <h2 className={`faq-title text-4xl md:text-6xl leading-tight text-[#30373C] ${tenorSans.className}`}>
              Frequently Asked Questions
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

      {/* Footer */}
      <footer ref={footerRef} className="py-12 md:py-20 px-6 lg:px-[60px] border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="footer-content flex flex-col items-center gap-8 md:gap-0 mb-12 md:mb-16">
            <div className="text-center">
              <h3 className={`text-2xl md:text-3xl mb-6 text-[#6B6560] ${tenorSans.className}`}>Vyan Abimanyu</h3>
              <p className="text-[#6B6560] text-sm md:text-base">Bali, Indonesia</p>
            </div>
            <div className="max-w-[400px] text-[#6B6560] leading-relaxed text-center text-sm md:text-base">
              <p>Your local companion for a deeper connection. Dedicated to exploring the soul of Bali through eyes of a friend, where every curated moment is anchored in safety, authenticity, and heart.</p>
            </div>
          </div>
          <div className="footer-content flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-gray-500">
             <p className="text-sm">&copy; 2026 Web by <Link href="https://flaat.studio" target="_blank" rel="noopener noreferrer" className='font-semibold hover:text-[#2D2623] transition-colors'>Flaat Studio</Link></p>
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
    </div>
  )
}
