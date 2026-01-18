'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

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
  { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80', alt: 'Cliff' },
  { src: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=400&q=80', alt: 'Cave' },
  { src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=400&q=80', alt: 'Temple' },
  { src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80', alt: 'Ocean' },
  { src: 'https://images.unsplash.com/photo-1552671080-1b725171796b?auto=format&fit=crop&w=400&q=80', alt: 'Statue' },
  { src: 'https://images.unsplash.com/photo-1558005530-d7c4dd9847d2?auto=format&fit=crop&w=400&q=80', alt: 'Rice Fields' },
  { src: 'https://images.unsplash.com/photo-1537953391640-642fae9ae8b7?auto=format&fit=crop&w=400&q=80', alt: 'Lake Temple' },
  { src: 'https://images.unsplash.com/photo-1505933332464-424a91008038?auto=format&fit=crop&w=400&q=80', alt: 'Mountain Horse' },
  { src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=400&q=80', alt: 'Coastal View' },
  { src: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80', alt: 'Water Palace' },
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

// Cinematic easing for "premium" feel
const CINEMATIC_EASE = "easeInOut";

// Gallery Section Component
const GallerySection = () => {
  return (
    <section id="gallery" className="bg-white text-[#333] py-20 px-6 lg:px-[60px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="overflow-hidden mb-[60px]">
            <motion.h1 
                className="font-['Tenor_Sans'] text-5xl lg:text-[64px] font-normal text-[#2c3e50]"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
            >
            Island Highlights
            </motion.h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[15px] mb-[60px]">
          {galleryImages.map((image, index) => (
            <motion.div 
                key={index} 
                className="aspect-[4/3] overflow-hidden bg-gray-100 relative group"
                initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.4, ease: CINEMATIC_EASE, delay: index * 0.1 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                width={400}
                height={500}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mt-10 gap-8">
          <motion.button 
            className="py-[15px] px-10 border border-[#333] bg-transparent rounded-full font-['Montserrat'] text-base cursor-pointer transition-all hover:bg-[#333] hover:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.4 }}
          >
            Plan Your Trip
          </motion.button>
          <motion.p 
            className="max-w-[400px] text-left text-[15px] text-[#777] font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.6 }}
          >
            We&apos;ve chosen some of Bali&apos;s most amazing landscapes for those who want to see more than just the usual spots
          </motion.p>
        </div>
      </div>
    </section>
  )
}

// Transport Section Component
const TransportSection = () => {
  return (
    <section id="transport" className="bg-white text-[#2c3e50] py-20 lg:py-[120px] px-6 lg:px-24 min-h-screen flex justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-[1280px] grid grid-cols-12 gap-y-10 lg:gap-0">
        {/* Headline */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-4 row-start-1 font-['Tenor_Sans'] text-4xl lg:text-[68px] font-normal leading-[1.08] text-[#3a3a3a] tracking-[-1px] z-[3] self-start pt-0 lg:pt-[68px] mb-0 relative">
             <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.2 }}
             >
                Your Private Sanctuary<br />on Wheels
             </motion.div>
        </div>

        {/* Small Left Image */}
        <motion.div 
            className="hidden lg:block col-span-3 row-start-1 w-[240px] aspect-[4/5] self-start mt-3 overflow-hidden"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: CINEMATIC_EASE }}
        >
          <Image
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400"
            alt="Jungle car"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            width={400}
            height={500}
          />
        </motion.div>

        {/* Large Right Image */}
        <motion.div 
            className="hidden lg:block col-span-5 col-start-8 row-span-2 row-start-1 h-[600px] mt-48 self-start overflow-hidden"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: CINEMATIC_EASE, delay: 0.3 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1542332205-4da5c5217d09?auto=format&fit=crop&q=80&w=800"
            alt="Transport"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
            width={400}
            height={500}
          />
        </motion.div>

        {/* Text Block */}
        <motion.div 
            className="col-span-12 lg:col-span-3 lg:col-start-2 row-start-2 pt-8 lg:pt-64 max-w-[280px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.6 }}
        >
          <h2 className="text-sm font-medium text-[#666] mb-5 tracking-[0.3px] uppercase">
            Experienced Chauffeur-Guides
          </h2>
          <p className="text-[15px] leading-[1.68] text-[#666] font-light">
            Travel should be as restorative as the destination itself. Our curated fleet offers more than just transit; it is your private lounge between horizons. Spacious, climate-controlled, and stocked with thoughtful amenities to ensure your journey is seamless.
          </p>
        </motion.div>

        {/* Bottom Interior Image */}
        <motion.div 
            className="hidden lg:block col-span-2 col-start-5 row-start-2 w-[260px] h-[320px] mt-64 -ml-2 overflow-hidden"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: CINEMATIC_EASE, delay: 0.5 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400"
            alt="Window view"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            width={400}
            height={500}
          />
        </motion.div>

        {/* Pagination */}
        <motion.div 
            className="col-span-12 lg:col-span-2 lg:col-start-2 row-start-3 self-end text-xl border-b-[1.5px] border-[#2c3e50] w-fit pb-1 font-normal mt-48"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.8 }}
        >
          01/03
        </motion.div>
      </div>
    </section>
  )
}

// Philosophy Section Component
const PhilosophySection = () => {
  return (
    <section id="philosophy" className="bg-white flex justify-center items-center min-h-screen py-20 px-5">
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
          "These locations are just the start. We&apos;ll go wherever you&apos;re curious to explore. We can stay as long as you like and move on whenever you&apos;re ready."
        </motion.h2>
      </div>
    </section>
  )
}

// Custom Section Component
const CustomSection = () => {
  return (
    <section id="custom" className="bg-white text-[#333] py-[60px] px-6 lg:px-10 min-h-screen flex flex-col relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div 
            className="text-base font-normal text-[#666] mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            Custom Your Trip
        </motion.div>

        <main className="flex flex-col items-center relative -mt-5">
          {/* Large Title overlaying image */}
          <motion.h1 
            className="absolute top-[45%] -translate-y-1/2 font-['Tenor_Sans'] text-4xl lg:text-[90px] font-normal tracking-[2px] whitespace-nowrap lg:whitespace-normal z-[2] pointer-events-none text-white text-center lg:text-left" 
            style={{ mixBlendMode: 'difference' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: CINEMATIC_EASE, delay: 0.4 }}
          >
            Somewhere else in mind?
          </motion.h1>

          {/* Central Portrait Image */}
          <motion.div 
            className="w-full max-w-[420px] h-[500px] lg:h-[720px] overflow-hidden z-[1]"
            initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: CINEMATIC_EASE }}
          >
            <Image
              src="https://images.pexels.com/photos/28211183/pexels-photo-28211183.jpeg"
              alt="Gray concrete cross on top of gray concrete building"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
              width={800}
              height={1000}
            />
          </motion.div>
        </main>

        {/* Descriptive Paragraph */}
        <div className="max-w-[800px] text-center mx-auto my-[60px] lg:my-10 z-[3]">
          <motion.p 
            className="text-sm font-light text-[#888] tracking-[0.3px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.6 }}
          >
            Bali is an endless map of secrets, and the most beautiful corners are often the ones not found in any guidebook. If there is a hidden sanctuary you&apos;ve dreamt of visiting, a specific light you wish to chase for your lens, or a remote village you&apos;ve long desired to explore, we will find the way together. My expertise is your canvas, and I am dedicated to unlocking the doors to the island&apos;s most private and authentic experiences
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
          <button className="bg-[#2c3135] text-white py-[18px] px-[50px] rounded-full text-base font-normal transition-colors hover:bg-[#1a1d1f] border-none cursor-pointer">
            Personalize Your Path
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page Component
export default function DestinationPage() {
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
    </div>
  )
}
