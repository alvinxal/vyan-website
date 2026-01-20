'use client'

import { Tenor_Sans } from 'next/font/google'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { Instagram, Facebook, Twitter } from 'lucide-react'

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
    title: "The Breath of the Mountain",
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
  { src: 'https://images.unsplash.com/photo-1546484488-2a1430996887?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Cultural Portrait' }, { src: 'https://images.unsplash.com/photo-1585302397841-b42e837d0d81?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Traditional Sari' },
  { src: 'https://images.unsplash.com/photo-1542897730-cc0c1dd8b73b?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Ceremony Procession' },
 { src: 'https://images.unsplash.com/photo-1565970141926-c001afaf8577?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Dragon Dance' },
  { src: 'https://images.unsplash.com/photo-1552301726-570d51466ae2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Lake Ritual' },
   { src: 'https://images.unsplash.com/photo-1612017888429-0110c5f45334?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Street Life' },
]

// Transport services data
const transportData = [
  {
    id: 1,
    title: "Ride in Total Comfort",
    smallTitle: "Friendly Drivers Who Know the Way",
    description: "Getting there shouldn't be a hassle. Think of our cars as your personal chill zone—plenty of legroom, icy AC, and everything you need to relax. Our drivers know the roads inside out, so you can just sit back, nap, or enjoy the view without worrying about a thing.",
    images: [
      {
        src: "/ride1.webp",
        alt: "Ride 1",
        position: "small-left"
      },
      {
        src: "/ride2.webp",
        alt: "Ride 2",
        position: "large-right"
      },
      {
        src: "/ride3.webp",
        alt: "Ride 3",
        position: "bottom-interior"
      }
    ]
  },
  {
    id: 2,
    title: "Stay Somewhere Special",
    smallTitle: "Unique Private Villas",
    description: "We skip the boring chain hotels to find you places with actual character. Whether it's a hidden bamboo house in the rice terraces or a villa right on the cliff edge, these are spots that actually feel like Bali. It's less about gold faucets and more about great views and peace and quiet.",
   images: [
      {
        src: "/woman-swimming.webp",
        alt: "Woman Swimming",
        position: "small-left"
      },
      {
        src: "/villa-inside.webp",
        alt: "Villa Inside",
        position: "large-right"
      },
      {
        src: "/cafe-on-beach.webp",
        alt: "Cafe on Beach",
        position: "bottom-interior"
      }
    ]
  },
  {
    id: 3,
    title: "Real Food, No Tourist Traps",
    smallTitle: "Authentic Local Eats",
    description: "We want you to taste the food that locals actually eat. We bypass the overpriced tourist spots and take you to the hidden gems we love. From traditional family feasts to quiet dinners overlooking the jungle, you're going to experience the real flavors of the island.",
    images: [
      {
        src: "/food1.webp",
        alt: "Food 1",
        position: "small-left"
      },
      {
        src: "/bartender.webp",
        alt: "Bartender",
        position: "large-right"
      },
      {
        src: "/food2.webp",
        alt: "Food 2",
        position: "bottom-interior"
      }
    ]
  }
]

// Hero Section Component

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#1a1a1a]">
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
      <motion.header 
        className="absolute top-0 w-full flex justify-between items-center px-6 lg:px-[60px] py-10 z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
       <Link href="/" className="font-['Tenor_Sans'] text-2xl font-normal tracking-wide text-white">
          Vyan Abimanyu
        </Link>
        <nav className="hidden md:flex gap-10">
          {['Destination', 'Inquiry'].map((item, index) => (
            <motion.a
              key={item}
              href={item === 'Inquiry' ? '/inquiry' : `#${item.toLowerCase()}`}
              className="text-white text-sm font-normal hover:opacity-70 transition-opacity"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </motion.header>

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
          <div className="flex flex-col items-center flex-1 max-w-md mx-8">
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
              
              <div className="absolute w-[200%] text-center pointer-events-none z-[3]">
                <AnimatePresence mode="wait">
                  <motion.h1 
                    key={currentSlide}
                    className="font-['Tenor_Sans'] text-[80px] lg:text-[80px] md:text-[60px] font-normal leading-none tracking-[2px] text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
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

  // We only display the first 6 images to maintain the strict 2-row layout
  const displayImages = galleryImages.slice(0, 6);

  return (
    <section id="gallery" className="bg-white text-[#333] py-20 px-6 lg:px-[60px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
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

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mt-10 gap-8">
          <motion.button 
            className="group inline-flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.4 }}
          >
            <span className={`text-lg text-[#30373C] ${tenorSans.className} border-b border-[#30373C] pb-0.5`}>
              Plan Your Trip
            </span>
            <motion.span 
              initial={{ x: 0, scale: 1 }}
              whileHover={{ x: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="text-[#30373C] text-lg"
            >
              →
            </motion.span>
          </motion.button>
          <motion.p 
            className="max-w-[400px] text-[#30373C] text-base md:text-lg leading-[1.8] font-light text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.6 }}
          >
            We've chosen some of Bali's most amazing landscapes for those who want to see more than just the usual spots
          </motion.p>
        </div>
      </div>
    </section>
  )
}

// Transport Section Component
const TransportSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax scroll effects for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  return (
    <section ref={sectionRef} id="transport" className="bg-white text-[#2c3e50] px-6 pt-40 lg:px-[60px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: CINEMATIC_EASE }}
        >   <span className="faq-subtitle block mb-4 text-[#6B6560] text-sm uppercase tracking-widest font-medium">Facilites You Get</span>
          <h2 className={`text-6xl leading-tight text-[#30373C] ${tenorSans.className}`}>
            Handpicked for You
          </h2>
        </motion.div>
        {/* Service 1: Ride - Images RIGHT, Text LEFT */}
        <ServiceItem 
          data={transportData[0]} 
          layout="right"
          scrollProgress={scrollYProgress}
          parallaxSpeeds={{ small: [60, -80], large: [150, -180], bottom: [220, -260], text: [30, -40] }}
        />

        {/* Service 2: Stay - Images LEFT, Text RIGHT (Mirrored) */}
        <ServiceItem 
          data={transportData[1]} 
          layout="left"
          scrollProgress={scrollYProgress}
          parallaxSpeeds={{ small: [80, -100], large: [180, -220], bottom: [250, -300], text: [35, -50] }}
        />

        {/* Service 3: Food - Images RIGHT, Text LEFT (Different arrangement) */}
        <ServiceItem 
          data={transportData[2]} 
          layout="right-alt"
          scrollProgress={scrollYProgress}
          parallaxSpeeds={{ small: [70, -90], large: [160, -200], bottom: [240, -280], text: [32, -45] }}
        />
      </div>
    </section>
  )
}

// Individual Service Item Component
const ServiceItem = ({ 
  data, 
  layout, 
  scrollProgress,
  parallaxSpeeds 
}: { 
  data: typeof transportData[0]; 
  layout: 'left' | 'right' | 'right-alt';
  scrollProgress: any;
  parallaxSpeeds: { small: [number, number]; large: [number, number]; bottom: [number, number]; text: [number, number] };
}) => {
  // Debug logging
  console.log(`ServiceItem - ${data.title}:`, {
    layout,
    images: data.images.map(img => ({ src: img.src, position: img.position }))
  });

  const ySmall = useTransform(scrollProgress, [0, 1], parallaxSpeeds.small)
  const yLarge = useTransform(scrollProgress, [0, 1], parallaxSpeeds.large)
  const yBottom = useTransform(scrollProgress, [0, 1], parallaxSpeeds.bottom)
  const yText = useTransform(scrollProgress, [0, 1], parallaxSpeeds.text)

  if (layout === 'right') {
    // Layout 1: Text LEFT, Images RIGHT
    return (
      <div className="grid grid-cols-12 gap-8 mb-32 lg:mb-48 min-h-[600px] relative">
        {/* Text Block - Left Side */}
        <motion.div
          className="col-span-12 lg:col-span-5 flex flex-col justify-center z-10"
          style={{ y: yText }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: CINEMATIC_EASE }}
        >
          <h2 className="text-sm font-medium text-[#666] mb-4 tracking-[0.3px] uppercase">
            {data.smallTitle}
          </h2>
          <h3 className={`font-['Tenor_Sans'] text-4xl lg:text-5xl font-normal mb-6 text-[#2c3e50]`}>
            {data.title}
          </h3>
          <p className="text-base leading-relaxed text-[#666] font-light max-w-[480px]">
            {data.description}
          </p>
        </motion.div>

        {/* Images - Right Side */}
        <div className="col-span-12 lg:col-span-7 relative h-[500px] lg:h-[600px]">
          {/* Large Image */}
          <motion.div
            className="absolute top-0 right-0 w-[60%] h-[70%] overflow-hidden rounded-sm"
            style={{ y: yLarge }}
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
          >
            <Image
              src={data.images.find(img => img.position === 'large-right')?.src || ''}
              alt={data.images.find(img => img.position === 'large-right')?.alt || ''}
              className="w-full h-full object-cover"
              width={600}
              height={700}
            />
          </motion.div>

          {/* Small Image */}
          <motion.div
            className="absolute bottom-0 left-0 w-[45%] h-[50%] overflow-hidden rounded-sm"
            style={{ y: ySmall }}
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: CINEMATIC_EASE, delay: 0.2 }}
          >
            <Image
              src={data.images.find(img => img.position === 'small-left')?.src || ''}
              alt={data.images.find(img => img.position === 'small-left')?.alt || ''}
              className="w-full h-full object-cover"
              width={400}
              height={500}
            />
          </motion.div>

          {/* Bottom Accent Image */}
          <motion.div
            className="absolute top-[40%] right-[15%] w-[35%] h-[40%] overflow-hidden rounded-sm"
            style={{ y: yBottom }}
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: CINEMATIC_EASE, delay: 0.4 }}
          >
            <Image
              src={data.images.find(img => img.position === 'bottom-interior')?.src || ''}
              alt={data.images.find(img => img.position === 'bottom-interior')?.alt || ''}
              className="w-full h-full object-cover"
              width={400}
              height={500}
            />
          </motion.div>
        </div>
      </div>
    )
  }

  if (layout === 'left') {
    // Layout 2: Images LEFT, Text RIGHT (Mirrored)
    return (
      <div className="grid grid-cols-12 gap-8 mb-32 lg:mb-48 min-h-[600px] relative">
        {/* Images - Left Side */}
        <div className="col-span-12 lg:col-span-7 relative h-[500px] lg:h-[600px] order-2 lg:order-1 z-0">
          {/* Large Image */}
          <motion.div
            className="absolute top-0 left-0 w-[60%] h-[70%] overflow-hidden rounded-sm z-10"
            style={{ y: yLarge }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
          >
            <Image
              src={data.images.find(img => img.position === 'large-right')?.src || ''}
              alt={data.images.find(img => img.position === 'large-right')?.alt || ''}
              className="w-full h-full object-cover"
              width={600}
              height={700}
            />
          </motion.div>

          {/* Small Image */}
          <motion.div
            className="absolute bottom-0 right-0 w-[45%] h-[50%] overflow-hidden rounded-sm z-20"
            style={{ y: ySmall }}
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: CINEMATIC_EASE, delay: 0.2 }}
          >
            <Image
              src={data.images.find(img => img.position === 'small-left')?.src || ''}
              alt={data.images.find(img => img.position === 'small-left')?.alt || ''}
              className="w-full h-full object-cover"
              width={400}
              height={500}
            />
          </motion.div>

          {/* Bottom Accent Image */}
          <motion.div
            className="absolute top-[40%] left-[15%] w-[35%] h-[40%] overflow-hidden rounded-sm z-30"
            style={{ y: yBottom }}
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: CINEMATIC_EASE, delay: 0.4 }}
          >
            <Image
              src={data.images.find(img => img.position === 'bottom-interior')?.src || ''}
              alt={data.images.find(img => img.position === 'bottom-interior')?.alt || ''}
              className="w-full h-full object-cover"
              width={400}
              height={500}
            />
          </motion.div>
        </div>

        {/* Text Block - Right Side */}
        <motion.div
          className="col-span-12 lg:col-span-5 flex flex-col justify-center z-40 order-1 lg:order-2"
          style={{ y: yText }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: CINEMATIC_EASE }}
        >
          <h2 className="text-sm font-medium text-[#666] mb-4 tracking-[0.3px] uppercase">
            {data.smallTitle}
          </h2>
          <h3 className={`font-['Tenor_Sans'] text-4xl lg:text-5xl font-normal mb-6 text-[#2c3e50]`}>
            {data.title}
          </h3>
          <p className="text-base leading-relaxed text-[#666] font-light max-w-[480px]">
            {data.description}
          </p>
        </motion.div>
      </div>
    )
  }

  // Layout 3: Text LEFT, Images RIGHT (Alternative arrangement)
  return (
    <div className="grid grid-cols-12 gap-8 mb-32 lg:mb-48 min-h-[600px] relative">
      {/* Text Block - Left Side */}
      <motion.div
        className="col-span-12 lg:col-span-5 flex flex-col justify-center z-10"
        style={{ y: yText }}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: CINEMATIC_EASE }}
      >
        <h2 className="text-sm font-medium text-[#666] mb-4 tracking-[0.3px] uppercase">
          {data.smallTitle}
        </h2>
        <h3 className={`font-['Tenor_Sans'] text-4xl lg:text-5xl font-normal mb-6 text-[#2c3e50]`}>
          {data.title}
        </h3>
        <p className="text-base leading-relaxed text-[#666] font-light max-w-[480px]">
          {data.description}
        </p>
      </motion.div>

      {/* Images - Right Side (Different arrangement) */}
      <div className="col-span-12 lg:col-span-7 relative h-[500px] lg:h-[600px]">
        {/* Small Image Top */}
        <motion.div
          className="absolute top-0 left-0 w-[40%] h-[45%] overflow-hidden rounded-sm"
          style={{ y: ySmall }}
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
          whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
        >
          <Image
            src={data.images.find(img => img.position === 'small-left')?.src || ''}
            alt={data.images.find(img => img.position === 'small-left')?.alt || ''}
            className="w-full h-full object-cover"
            width={400}
            height={500}
          />
        </motion.div>

        {/* Large Image */}
        <motion.div
          className="absolute top-[20%] right-0 w-[65%] h-[65%] overflow-hidden rounded-sm"
          style={{ y: yLarge }}
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
          whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: CINEMATIC_EASE, delay: 0.2 }}
        >
          <Image
            src={data.images.find(img => img.position === 'large-right')?.src || ''}
            alt={data.images.find(img => img.position === 'large-right')?.alt || ''}
            className="w-full h-full object-cover"
            width={600}
            height={700}
          />
        </motion.div>

        {/* Bottom Accent Image */}
        <motion.div
          className="absolute bottom-0 left-[10%] w-[38%] h-[35%] overflow-hidden rounded-sm"
          style={{ y: yBottom }}
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: CINEMATIC_EASE, delay: 0.4 }}
          >
            <Image
              src={data.images.find(img => img.position === 'bottom-interior')?.src || ''}
              alt={data.images.find(img => img.position === 'bottom-interior')?.alt || ''}
              className="w-full h-full object-cover"
              width={400}
              height={500}
            />
          </motion.div>
        </div>
      </div>
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
  
  // Image opacity fades in alongside the reveal
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  
  // Text opacity appears smoothly after image is 90% revealed
  const textOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])
  
  return (
    <section ref={sectionRef} id="custom" className="bg-white text-[#333] py-[60px] px-6 lg:px-10 min-h-screen flex flex-col relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">

        <main className="flex flex-col items-center relative -mt-5">
          {/* Large Title overlaying image */}
          <motion.h1 
            className="absolute top-[45%] -translate-y-1/2 font-['Tenor_Sans'] text-4xl lg:text-[90px] font-normal tracking-[2px] whitespace-nowrap lg:whitespace-normal z-[2] pointer-events-none text-white text-center lg:text-left" 
            style={{ mixBlendMode: 'difference', opacity: textOpacity }}
          >
            Somewhere else in mind?
          </motion.h1>

          {/* Central Portrait Image */}
          <motion.div 
            className="w-full max-w-[420px] h-[500px] lg:h-[720px] overflow-hidden z-[1]"
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
        <div className="max-w-[800px] text-center mx-auto my-[60px] lg:my-10 z-[3]">
          <motion.p 
            className="block mt-6 text-[#6B6560] text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.6 }}
          >
            Bali is an endless map of secrets, and the most beautiful corners are often the ones not found in any guidebook. If there is a hidden sanctuary you've dreamt of visiting, a specific light you wish to chase for your lens, or a remote village you've long desired to explore, we will find the way together. My expertise is your canvas, and I am dedicated to unlocking the doors to the island's most private and authentic experiences
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
      
      <footer className="py-20 px-6 lg:px-[60px] border-t border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-start mb-16">
            <div>
              <h3 className={`text-3xl mb-6 text-[#6B6560] ${tenorSans.className}`}>Vyan Abimanyu</h3>
              <p className="text-[#6B6560]">Bali, Indonesia</p>
            </div>
            <div className="max-w-[400px] text-[#6B6560] leading-relaxed text-right">
              <p>Your local companion for a deeper connection. Dedicated to exploring the soul of Bali through the eyes of a friend, where every curated moment is anchored in safety, authenticity, and heart.</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-gray-500">
             <p>&copy; 2026 Web by <Link href="https://flaat.studio" target="_blank" rel="noopener noreferrer" className='font-semibold hover:text-[#2D2623] transition-colors'>Flaat Studio</Link></p>
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
