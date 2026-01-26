'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Tenor_Sans } from 'next/font/google'
import { ServiceItem } from './ServiceItem'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })

// Cinematic easing for "premium" feel
const CINEMATIC_EASE = "easeInOut";

// Transport services data
export const transportData = [
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
    description: "We skip the boring chain hotels to find you places with actual character. Whether it's a hidden bamboo house in the rice terraces or a villa right on cliff edge, these are spots that actually feel like Bali. It's less about gold faucets and more about great views and peace and quiet.",
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
  },
  {
    id: 4,
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

// Transport Section Component
export const TransportSection = () => {
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
        >
          <span className="faq-subtitle block mb-4 text-[#6B6560] text-sm uppercase tracking-widest font-medium">Facilities You Get</span>
          <h2 className={`text-6xl leading-tight text-[#30373C] ${tenorSans.className}`}>
            Handpicked for You
          </h2>
        </motion.div>
        
        {/* Service 1: Ride - Images RIGHT, Text LEFT */}
        <ServiceItem 
          data={transportData[0]} 
          layout={'right-alt'}
          scrollProgress={scrollYProgress}
          parallaxSpeeds={{ small: [70, -90], large: [160, -200], bottom: [240, -280], text: [32, -45] }}
          customGap="gap-8"
        />

        {/* Service 2: Stay - Images LEFT, Text RIGHT */}
        <ServiceItem 
          data={transportData[1]} 
          layout="left"
          scrollProgress={scrollYProgress}
          parallaxSpeeds={{ small: [70, -90], large: [160, -200], bottom: [240, -280], text: [32, -45] }}
          customGap="gap-8"
        />

        {/* Service 3: Food - Images RIGHT, Text LEFT (Different arrangement) */}
        <ServiceItem 
          data={transportData[2]} 
          layout="right-alt"
          scrollProgress={scrollYProgress}
          parallaxSpeeds={{ small: [70, -90], large: [160, -200], bottom: [240, -280], text: [32, -45] }}
          customGap="gap-8 lg:gap-16"
        />
      </div>
    </section>
  )
}