'use client'
import { useRef, useEffect, useState } from 'react'
import { Tenor_Sans } from 'next/font/google'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useLoading } from '@/lib/loading-context'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })

const GUIDE_STEPS = [
  { id: 0, image: '', location: '', description: '' },
  { id: 1, image: '/vyan.webp', location: '', description: 'I spend my days in Bali’s quiet villages, hidden temples, secret beaches, and places most tours never reach. This isn’t about ticking off landmarks. It’s about slow walks, real conversations, and moments that stay with you long after you leave. Let’s explore together the way travel should feel: personal, peaceful, and full of meaning.' },
  { id: 2, image: '/testi-1.webp', location: 'Garuda Wisnu Kencana', description: 'Experience the magic of Uluwatu\'s towering cliffs and the mesmerizing Kecak Fire Dance at sunset. I\'ll take you to hidden spots for the best ocean views that most tourists miss.' },
  { id: 3, image: '/testi-2.webp', location: 'Bali VW Safari Tour', description: 'Cruise through misty highlands in a vintage VW, past Mount Batur’s dramatic lava fields and the calm waters of Lake Batur. We’ll stop at a local coffee spot with volcano views  where the air is cool, the brew is strong, and time slows down.' },
  { id: 4, image: '/testi-3.webp', location: 'Atlas Beach Club', description: 'Surf, sun, and soul. Canggu blends world-class waves with cozy cafes and beach clubs that buzz just enough — without losing their chill.I’ll show you where the locals eat, where the best sunset cocktails pour, and how to find stillness even in the heart of it all.' },
]

export default function GuideSection() {
  const { isLoading } = useLoading()
  const guideSectionRef = useRef<HTMLElement>(null)
  const guideTrackRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0)

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

  // Mobile Guide Slide Animations
  useEffect(() => {
    if (isLoading) return

    const mm = gsap.matchMedia()

    mm.add("(max-width: 767px)", () => {
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

    return () => mm.revert()
  }, [isLoading])

  // Guide Section Horizontal Scroll Animation (Desktop only)
  useEffect(() => {
    if (isLoading) return

    const mm = gsap.matchMedia()
    
    mm.add("(min-width: 768px)", (context) => {
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

    })

    return () => mm.revert()
  }, [isLoading])

  return (
      <section ref={guideSectionRef} className="pt-12 pb-20 overflow-hidden min-h-screen flex flex-col justify-start relative">
        
        {/* Desktop: GSAP Horizontal Scroll Animation */}
        <div className="hidden md:block">
          {/* Text Content within centered container */}
          <div className=" mx-auto px-6 lg:px-[60px] relative z-20 w-full">
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
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal Scrollable Layout */}
        <div className="block md:hidden">
          <div className="relative z-20 w-full">
            <div className="px-6 mb-4">
              <span className="guide-subtitle block mb-4 text-[#6B6560] text-sm uppercase tracking-widest font-medium">Meet Your Guide</span>
              <h2 className={`text-4xl leading-tight text-[#30373C] ${tenorSans.className}`}>
                A Local Journey
                <br />
                With Me
              </h2>
            </div>

            {/* Horizontal Scrollable Container with Snap */}
            <div className="relative w-full overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
              <div className="flex px-6 gap-4 w-max">
                {GUIDE_STEPS.slice(1).map((step, index) => (
                  <div 
                    key={step.id} 
                    className="flex-shrink-0 w-[85vw] snap-center guide-slide-mobile"
                  >
                    <div className="flex flex-col gap-4 items-start">
                      {/* Mobile Image */}
                      {step.image && (
                        <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden bg-black/5 shadow-sm">
                          <Image
                            src={step.image}
                            alt={step.location || `Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 85vw"
                          />
                          <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                      )}

                      {/* Mobile Text */}
                      <div className="pr-4">
                        {step.location && (
                          <div className={`text-xl mb-2 text-[#30373C] ${tenorSans.className}`}>
                            {step.location}
                          </div>
                        )}
                        {step.description && (
                          <p className="text-[#6B6560] leading-relaxed text-sm">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Spacer for end of scroll */}
                <div className="w-2 flex-shrink-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
