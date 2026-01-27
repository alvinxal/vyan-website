'use client'
import { useRef, useEffect, useState } from 'react'
import { Tenor_Sans } from 'next/font/google'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FAQItem from '@/components/FAQItem'
import { useLoading } from '@/lib/loading-context'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })

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

export default function FAQSection() {
  const { isLoading } = useLoading()
  const [openFaqId, setOpenFaqId] = useState<number | null>(null)

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
  }, [isLoading])

  return (
      <section className="faq-section py-20 md:py-32 bg-white relative z-20">
        <div className="max-w-[800px] mx-auto px-6 lg:px-[60px]">
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
  )
}
