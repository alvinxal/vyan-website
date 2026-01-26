'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useTransform } from 'framer-motion'

// Cinematic easing for "premium" feel
const CINEMATIC_EASE = "easeInOut";

export interface ServiceItemProps {
  data: {
    id: number
    title: string
    smallTitle: string
    description: string
    images: {
      src: string
      alt: string
      position: string
    }[]
  }
  layout: 'left' | 'right' | 'right-alt'
  scrollProgress: any
  parallaxSpeeds: { small: [number, number]; large: [number, number]; bottom: [number, number]; text: [number, number] }
  customGap?: string
  className?: string
}

export const ServiceItem = ({ 
  data, 
  layout, 
  scrollProgress,
  parallaxSpeeds,
  customGap = "gap-8",
  className = ""
}: ServiceItemProps) => {
  // Debug logging
  console.log(`ServiceItem - ${data.title}:`, {
    layout,
    images: data.images.map(img => ({ src: img.src, position: img.position }))
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use reduced parallax values for mobile to prevent layout breaking
  const activeParallaxSpeeds = isMobile ? {
      small: [15, -15] as [number, number],
      large: [30, -30] as [number, number],
      bottom: [20, -20] as [number, number],
      text: [0, 0] as [number, number]
  } : parallaxSpeeds;

  const ySmall = useTransform(scrollProgress, [0, 1], activeParallaxSpeeds.small)
  const yLarge = useTransform(scrollProgress, [0, 1], activeParallaxSpeeds.large)
  const yBottom = useTransform(scrollProgress, [0, 1], activeParallaxSpeeds.bottom)
  const yText = useTransform(scrollProgress, [0, 1], activeParallaxSpeeds.text)

  if (layout === 'right') {
    // Layout 1: Using item #3 arrangement (same as right-alt)
    return (
      <div className={`grid grid-cols-12 ${customGap} mb-32 lg:mb-48 lg:min-h-[600px] ${className}`}>
        {/* Images - Right Side - ORDER 1 on mobile */}
        <div className="col-span-12 lg:col-span-7 relative h-[500px] lg:h-[600px] order-1">
          {/* Small Image Top */}
          <motion.div
            className="absolute top-0 left-0 w-[40%] h-[45%] overflow-hidden rounded-sm z-10"
            style={{ y: ySmall }}
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
            className="absolute top-[20%] right-0 w-[65%] h-[65%] overflow-hidden rounded-sm z-20"
            style={{ y: yLarge }}
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
            className="absolute bottom-0 left-[10%] w-[38%] h-[35%] overflow-hidden rounded-sm z-30"
            style={{ y: yBottom }}
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

        {/* Text Block - Left Side - ORDER 2 on mobile */}
        <motion.div
          className="col-span-12 lg:col-span-5 flex flex-col justify-center z-10 order-2 mt-8 lg:mt-0"
          style={{ y: yText }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: CINEMATIC_EASE, delay: isMobile ? 0.2 : 0 }}
        >
          <h2 className="text-sm font-medium text-[#666] mb-4 tracking-[0.3px] uppercase">
            {data.smallTitle}
          </h2>
          <h3 className="font-['Tenor_Sans'] text-4xl lg:text-5xl font-normal mb-6 text-[#2c3e50]">
            {data.title}
          </h3>
          <p className="text-base leading-relaxed text-[#666] font-light max-w-[480px]">
            {data.description}
          </p>
        </motion.div>
      </div>
    )
  }

  if (layout === 'left') {
    // Layout 2: Using item #3 arrangement (same as right-alt)
    return (
      <div className={`grid grid-cols-12 ${customGap} mb-32 lg:mb-48 lg:min-h-[600px] relative`}>
        {/* Images - Left Side - ORDER 1 on mobile */}
        <div className="col-span-12 lg:col-span-7 relative h-[500px] lg:h-[600px] order-1 z-0">
          {/* Small Image Top */}
          <motion.div
            className="absolute top-0 left-0 w-[40%] h-[45%] overflow-hidden rounded-sm z-10"
            style={{ y: ySmall }}
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
            className="absolute top-[20%] right-0 w-[65%] h-[65%] overflow-hidden rounded-sm z-20"
            style={{ y: yLarge }}
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
            className="absolute bottom-0 left-[10%] w-[38%] h-[35%] overflow-hidden rounded-sm z-30"
            style={{ y: yBottom }}
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

        {/* Text Block - Right Side - ORDER 2 on mobile */}
        <motion.div
          className="col-span-12 lg:col-span-5 flex flex-col justify-center z-40 order-2 mt-8 lg:mt-0"
          style={{ y: yText }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: CINEMATIC_EASE, delay: isMobile ? 0.2 : 0 }}
        >
          <h2 className="text-sm font-medium text-[#666] mb-4 tracking-[0.3px] uppercase">
            {data.smallTitle}
          </h2>
          <h3 className="font-['Tenor_Sans'] text-4xl lg:text-5xl font-normal mb-6 text-[#2c3e50]">
            {data.title}
          </h3>
          <p className="text-base leading-relaxed text-[#666] font-light max-w-[480px]">
            {data.description}
          </p>
        </motion.div>
      </div>
    )
  }

  // Layout 3: Text LEFT, Images RIGHT on Desktop, Images LEFT, Text RIGHT on Mobile (same as layout="left" on mobile)
  return (
    <div className={`grid grid-cols-12 ${customGap} mb-32 lg:mb-48 lg:min-h-[600px] relative`}>
      {/* Images - Right Side on Desktop, Left Side on Mobile - ORDER 1 on mobile, ORDER 2 on desktop */}
      <div className="col-span-12 lg:col-span-7 relative h-[500px] lg:h-[600px] order-1 lg:order-2 z-40">
        {/* Small Image Top */}
        <motion.div
          className="absolute top-0 left-0 w-[40%] h-[45%] overflow-hidden rounded-sm z-10"
          style={{ y: ySmall }}
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
          className="absolute top-[20%] right-0 w-[65%] h-[65%] overflow-hidden rounded-sm z-20"
          style={{ y: yLarge }}
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
          className="absolute bottom-0 left-[10%] w-[38%] h-[35%] overflow-hidden rounded-sm z-30"
          style={{ y: yBottom }}
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

      {/* Text Block - Left Side on Desktop, Right Side on Mobile - ORDER 2 on mobile, ORDER 1 on desktop */}
      <motion.div
        className="col-span-12 lg:col-span-5 flex flex-col justify-center z-40 order-2 lg:order-1 mt-8 lg:mt-0"
        style={{ y: yText }}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: CINEMATIC_EASE, delay: isMobile ? 0.2 : 0 }}
      >
        <h2 className="text-sm font-medium text-[#666] mb-4 tracking-[0.3px] uppercase">
          {data.smallTitle}
        </h2>
        <h3 className="font-['Tenor_Sans'] text-4xl lg:text-5xl font-normal mb-6 text-[#2c3e50]">
          {data.title}
        </h3>
        <p className="text-base leading-relaxed text-[#666] font-light max-w-[480px]">
          {data.description}
        </p>
      </motion.div>
    </div>
  )
}