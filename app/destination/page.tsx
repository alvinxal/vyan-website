'use client'

import { Tenor_Sans } from 'next/font/google'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import Header from '@/components/sections/Header'
import { TransportSection } from '@/components/sections/destination/TransportSection'
import Lenis from 'lenis'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import Footer from '@/components/sections/Footer'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })

// Hero data constant - array for carousel
const destinationHeroData = [
  {
    title: "The Whispers of Water",
    location: "Banyumala Twin Waterfall",
    imageUrl: "https://images.pexels.com/photos/4571930/pexels-photo-4571930.jpeg",
    videoUrl: "/banyumala_20s.mp4"
  },
  {
    title: "The Breath of Mountain",
    location: "Mount Agung",
    imageUrl: "https://images.pexels.com/photos/35159215/pexels-photo-35159215.jpeg",
    videoUrl: "/mount-agung_compressed.mp4"
  },
  {
    title: "The Silence Between Waves",
    location: "Nusa Penida",
    imageUrl: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
    videoUrl: "/beach.mp4"
  }
]

// Gallery images data
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1546484488-2a1430996887?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Beautiful Beach' }, 
  { src: 'https://images.unsplash.com/photo-1585302397841-b42e837d0d81?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Traditional Dance' },
  { src: 'https://images.unsplash.com/photo-1542897730-cc0c1dd8b73b?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Ceremony Procession' },
  { src: 'https://images.unsplash.com/photo-1565970141926-c001afaf8577?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Barong Dance' },
  { src: 'https://images.unsplash.com/photo-1552301726-570d51466ae2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Melukat Ritual' },
  { src: 'https://images.unsplash.com/photo-1612017888429-0110c5f45334?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Balinese Life' },
]

// Hero Section Component
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50 // Minimum distance to register as a swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Swipe left = next slide
      setCurrentSlide(prev => (prev + 1) % 3)
    } else if (isRightSwipe) {
      // Swipe right = previous slide
      setCurrentSlide(prev => (prev - 1 + 3) % 3)
    }
  }

  return (
    <section 
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#1a1a1a]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Video */}
      <AnimatePresence mode="wait">
        <motion.video
          key={currentSlide}
          className="absolute inset-0 w-full h-full object-cover blur-sm brightness-[0.6] scale-110 z-0"
          src={destinationHeroData[currentSlide].videoUrl}
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>
      
      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: 'radial-gradient(circle at 10% 90%, rgba(20, 40, 20, 0.4), transparent 50%), radial-gradient(circle at 90% 10%, rgba(20, 40, 20, 0.4), transparent 40%)'
      }} />

      {/* Header */}
      {/* Header */}
      <Header variant="transparent" />

      {/* Main Content */}
      <div className="flex items-center justify-center w-full relative z-[2]">
        {/* Centered Container with Arrows, Image, and Title */}
        <div className="flex items-center justify-between w-full max-w-6xl px-8">
          {/* Left Arrow */}
          <motion.button
            className="hidden lg:flex w-20 h-20 border border-white/40 rounded-full items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white transition-all flex-shrink-0"
            onClick={() => setCurrentSlide(prev => (prev - 1 + 3) % 3)}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 50 20" className="w-10 fill-none stroke-white stroke-1">
              <path d="M50 10 H2 M10 2 L2 10 L10 18" />
            </svg>
          </motion.button>

          {/* Center Content */}
          <div className="flex flex-col items-center flex-1 max-w-md mx-8 relative">
            {/* Destination Title Above Image */}
            <motion.div 
              className="text-center mb-8 pointer-events-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="font-['Tenor_Sans'] text-2xl lg:text-xl font-normal  text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                Destination
              </div>
            </motion.div>

            {/* Center Image - Made Smaller */}
            <div className="relative w-[280px] h-[380px] lg:w-[280px] lg:h-[380px] md:w-[240px] md:h-[320px] flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="w-full h-full"
                  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <Image
                    src={destinationHeroData[currentSlide].imageUrl}
                    alt="Destination image"
                    className="w-full h-full object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg" 
                    width={400} 
                    height={600}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay Text - Centered over image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] lg:w-[250%] max-w-[600px] text-center pointer-events-none z-[3]">
                <AnimatePresence mode="wait">
                  <motion.h1 
                    key={currentSlide}
                    className="font-['Tenor_Sans'] text-[38px] lg:text-[65px] md:text-[32px] font-normal leading-none tracking-[2px] text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {destinationHeroData[currentSlide].title.split('<br />').map((line: string, index: number) => (
                      <span key={index}>
                        {line}
                        {index < destinationHeroData[currentSlide].title.split('<br />').length - 1 && <br />}
                      </span>
                    ))}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <motion.button
            className="hidden lg:flex w-20 h-20 border border-white/40 rounded-full items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white transition-all flex-shrink-0"
            onClick={() => setCurrentSlide(prev => (prev + 1) % 3)}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 50 20" className="w-10 fill-none stroke-white stroke-1">
              <path d="M0 10 H48 M40 2 L48 10 L40 18" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.p 
          key={currentSlide}
          className="mt-12 text-center max-w-[700px] text-base font-light leading-relaxed opacity-90 text-white px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {destinationHeroData[currentSlide].location}
        </motion.p>
      </AnimatePresence>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-3 mt-6 z-[10] relative px-4 py-2 lg:hidden">
        {destinationHeroData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-4 md:h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-12 md:w-6' 
                : 'bg-white/70 hover:bg-white/90 w-4 md:w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

const GalleryItem = ({ image, className, index }: { image: { src: string, alt: string }, className: string, index: number }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])

  return (
    <motion.div 
      ref={ref}
      className={`relative group overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.15 }}
    >
      <motion.div 
        className="w-full h-[125%] -top-[12.5%] relative" 
        style={{ y }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
          width={800}
          height={600}
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
               
      <motion.div 
        className="absolute bottom-6 left-6 z-10 pointer-events-none"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 + (index * 0.1), duration: 0.8 }}
      >
        <div className="overflow-hidden">
          <span className={`block text-white text-lg lg:text-xl font-medium tracking-wide ${tenorSans.className} transform transition-transform duration-500 group-hover:-translate-y-1 drop-shadow-md`}>
            {image.alt}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Cinematic easing for "premium" feel
const CINEMATIC_EASE = "easeInOut";

// Gallery Section Component
const GallerySection = () => {
  // Editorial Layout Configuration: 5 Columns
  // Row 1: 1:2:2
  // Row 2: 2:2:1
  const layoutSpecs = [
    "lg:col-span-1 col-span-2", // 1. Cliff (1 unit)
    "lg:col-span-2 col-span-2", // 2. Cave (2 units)
    "lg:col-span-2 col-span-2", // 3. Temple (2 units)
    
    "lg:col-span-2 col-span-2", // 4. Ocean (2 units)
    "lg:col-span-2 col-span-2", // 5. Statue (2 units)
    "lg:col-span-1 col-span-2", // 6. Rice Fields (1 unit)
  ];

  // We only display the first 6 images to maintain a strict 2-row layout
  const displayImages = galleryImages.slice(0, 6);

  return (
    <section id="gallery" className="bg-white text-[#333] py-20 px-6 lg:px-[60px] overflow-hidden">
      <div className="px-6 lg:px-[60px] mx-auto">
        <div className=" mb-[60px]">
          <motion.h1
            className="font-['Tenor_Sans'] text-[64px] font-normal text-[#2c3e50]"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
          >
            Island Highlights
          </motion.h1>
        </div>

        {/* 5-Column Editorial Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-[60px]">
          {displayImages.map((image, index) => (
            <GalleryItem 
              key={index}
              image={image}
              index={index}
              className={`h-[250px] lg:h-[350px] ${layoutSpecs[index]}`}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-start items-start gap-12 md:gap-8 relative mt-20">
          <div className="md:w-1/4">
            <motion.button 
              className="group inline-flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.4 }}
            >
              <Link href="/inquiry" className="group inline-flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"><span className={`text-lg text-[#30373C] ${tenorSans.className} border-b border-[#30373C] pb-0.5`}>
                Plan Your Trip
              </span></Link>
              <span 
                className={`text-lg text-[#30373C] ${tenorSans.className} pb-0.5 transition-transform duration-300 group-hover:translate-x-1`}
              >
                →
              </span>
            </motion.button>
          </div>

          <div className="md:w-2/3">
            <motion.p 
              className="text-[#30373C] text-base md:text-lg leading-[1.8] font-light text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.6 }}
            >
              We’ve gathered some of Bali’s most breathtaking places. Not just the famous spots but the quiet corners where time slows down and magic happens.
              <span className="block mt-6">
                Imagine misty highland trails above Lake Batur. Secret beaches known only to locals. Temple gates hidden behind jungle vines. Village cafés where the coffee is strong and the stories are even stronger.
              </span>
              <span className="block mt-6">
                This isn’t about ticking off landmarks. It’s about building a trip that feels like you. Slow. Curious. Full of surprises.
              </span>
              <span className="block mt-6 text-[#6B6560] text-sm md:text-base">
                Let’s start planning. I’ll bring the local insight. You bring your vibe.
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Philosophy Section Component
const PhilosophySection = () => {
  return (
    <section id="philosophy" className="bg-white flex justify-center px-5 pb-64">
      <div className="text-center max-w-[1000px]">
        <motion.p 
          className="text-base text-[#999] capitalize tracking-[0.5px] mb-12 font-normal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: CINEMATIC_EASE }}
        >
          Beyond the Itinerary
        </motion.p>
        <motion.h2 
          className="font-['Tenor_Sans'] text-3xl lg:text-5xl leading-[1.3] text-[#666] font-normal tracking-[-0.5px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: CINEMATIC_EASE, delay: 0.2 }}
        >
          "These locations are just the start. We'll go wherever you're curious to explore. We can stay as long as you like and move on whenever you're ready."
        </motion.h2>
      </div>
    </section>
  )
}

// Custom Section Component
const CustomSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 10%"]
  })

  // Image is always 100% scale, but reveals from center using clip-path (square reveal)
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(50% 50% 50% 50%)", "inset(0% 0% 0% 0%)"]
  )

  // Image opacity fades in alongside with reveal
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Text opacity appears smoothly after image is 90% revealed
  const textOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  return (
    <section ref={sectionRef} id="custom" className="bg-white text-[#333] pt-24 pb-48 px-6 lg:px-10 min-h-screen flex flex-col relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">
        <main className="flex flex-col items-center relative -mt-5">
          {/* Large Title overlaying image */}
          <motion.h1
         className="absolute left-1/2 -translate-x-1/2 top-[45%] -translate-y-1/2 lg:left-0 lg:translate-x-0 font-['Tenor_Sans'] text-4xl lg:text-[90px] font-normal tracking-[2px] w-[95%] lg:w-auto lg:w-full z-[2] pointer-events-none text-[#f1efea] text-center leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            style={{  opacity: textOpacity }}
          >
            Somewhere else in mind?
          </motion.h1>

          {/* Central Portrait Image */}
          <motion.div
            className="w-full max-w-[280px] lg:max-w-[420px] h-[500px] lg:h-[720px] overflow-hidden z-[1]"
            style={{ clipPath, opacity: imageOpacity }}
          >
            <Image
              src="https://images.pexels.com/photos/28211183/pexels-photo-28211183.jpeg"
              alt="Gray concrete cross on top of gray concrete building"
              className="w-full h-full object-cover transition-transform duration-[2s]"
              width={800}
              height={1000}
            />
          </motion.div>
        </main>

        {/* Descriptive Paragraph */}
        <div className="max-w-[400px] text-center mx-auto my-[60px] lg:my-10 z-[3]">
          <motion.p 
            className="block mt-6 text-[#6B6560] text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.6 }}
          >
       Bali’s best spots aren’t in guidebooks.
If you’ve got a hidden temple, quiet village, or perfect light in mind. I’ll help you find it. <br /> <br />
Your dream trip? Let’s make it real.
          </motion.p>
        </div>

        {/* Call to Action Button */}
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: CINEMATIC_EASE, delay: 0.8 }}
        >
          <Link href="/inquiry" className="group relative inline-flex items-center justify-center px-12 py-5 bg-[#2c3135] text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl">
            <span className={`relative z-10 text-lg font-medium tracking-wide ${tenorSans.className}`}>Personalize Your Path</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page Component
export default function DestinationPage() {
  useEffect(() => {
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
  }, [])

  return (
    <div className="font-['Montserrat'] text-white bg-[#1a1a1a] scroll-smooth">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans:wght@400&family=Montserrat:wght@300;400;500&display=swap');
      `}</style>

      <HeroSection />
      <GallerySection />
      <TransportSection />
      <PhilosophySection />
      <CustomSection />
      
      <div className="bg-white"><Footer /></div>
    </div>
  )
}