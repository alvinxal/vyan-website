'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Tenor_Sans, Montserrat } from 'next/font/google'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

interface FAQItemProps {
  faq: {
    id: number
    question: string
    answer: string
  }
  index: number
  isOpen: boolean
  onToggle: () => void
}

export default function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="faq-item-container">
      <motion.div 
        className="faq-item border-b border-[#E5E0D8]"
      >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-8 text-left py-6 group"
      >
        <span className={`text-xl text-[#30373C] ${tenorSans.className} group-hover:text-[#2D2623] transition-colors pr-8`}>
          {faq.question}
        </span>
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full border border-[#30373C]/20 flex items-center justify-center"
          animate={{
            backgroundColor: isOpen ? '#30373C' : 'transparent',
            borderColor: isOpen ? '#30373C' : 'rgba(48, 55, 60, 0.2)',
            rotate: isOpen ? 180 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-4 h-4"
            fill="none" 
            stroke={isOpen ? 'white' : 'currentColor'}
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut",
              height: { duration: 0.3, ease: "easeOut" }
            }}
            style={{ overflow: 'hidden' }}
          >
            <p className={`text-[#6B6560] leading-relaxed text-base max-w-[90%] pb-8 ${montserrat.className}`}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </div>
  )
}
