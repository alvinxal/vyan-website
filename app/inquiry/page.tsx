'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Tenor_Sans, Montserrat } from 'next/font/google'
import Link from 'next/link'
import Header from '@/components/sections/Header'
import Lenis from 'lenis'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Phone, Mail, Loader2, Calendar, Facebook, Twitter } from 'lucide-react'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

// TypeScript interfaces
interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  groupSize: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

// Component: Toast Notification
const Toast = ({ message, isVisible, onClose, type = 'success' }: { message: string; isVisible: boolean; onClose: () => void; type?: 'success' | 'error' }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
            initial={{ opacity: 0, y: -20, right: 20 }}
            animate={{ opacity: 1, y: 0, right: 20 }}
            exit={{ opacity: 0, y: -20, right: 20 }}
            className={`fixed top-5 z-50 ${type === 'error' ? 'bg-red-600' : 'bg-[#2D2623]'} text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3`}
        >
          <div className="flex flex-col">
            <h4 className={`font-medium text-sm ${tenorSans.className}`}>{type === 'error' ? 'Error' : 'Success'}</h4>
            <p className={`text-xs text-gray-300 ${montserrat.className}`}>{message}</p>
          </div>
          <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Component: Header
// Removed local Header definition in favor of shared component

// Component: Radio Option
const RadioOption = ({
  label,
  value,
  checked,
  onChange,
  name = 'groupSize'
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}) => (
  <label className={`flex items-center gap-3 text-sm text-[#6B6560] cursor-pointer group ${montserrat.className}`}>
    <div className="relative flex items-center justify-center w-5 h-5">
      <input
        type="radio"
        name={name}
        value={value}
        className="peer appearance-none w-5 h-5 border border-[#2D2623]/30 rounded-full checked:border-[#2D2623] transition-colors cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      <div className="absolute w-2.5 h-2.5 bg-[#2D2623] rounded-full transform scale-0 peer-checked:scale-100 transition-transform duration-200 pointer-events-none"></div>
    </div>
    <span className={`${checked ? 'text-[#2D2623] font-medium' : 'group-hover:text-[#2D2623]'} transition-colors`}>{label}</span>
  </label>
);

// Component: Contact Form
const ContactForm = ({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    groupSize: 'solo'
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.date) newErrors.date = 'Please select a date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await onSubmit(formData);
    setFormData({ name: '', phone: '', email: '', date: '', groupSize: 'solo' });
    setErrors({});
    setIsSubmitting(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
             {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'John Doe' },
              { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 234 567 890' },
              { id: 'email', label: 'E-mail', type: 'email', placeholder: 'john@example.com' },
              { id: 'date', label: 'Expected Date', type: 'date', placeholder: '', hasIcon: true },
            ].map((field) => (
              <motion.div key={field.id} className="relative group" variants={itemVariants}>
                <label className={`block text-xs font-semibold text-[#2D2623] mb-2 uppercase tracking-widest opacity-60 ${montserrat.className}`}>
                    {field.label}
                </label>
                <div className="relative">
                    <input
                        type={field.type}
                        name={field.id}
                        value={formData[field.id as keyof FormData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        min={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                        className={`w-full bg-transparent border-b py-3 text-base text-[#2D2623] placeholder-[#2D2623]/30 focus:outline-none transition-colors duration-300 ${montserrat.className} ${field.type === 'date' ? 'cursor-pointer' : ''} ${
                          errors[field.id as keyof FormData] 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-[#2D2623]/20 focus:border-[#2D2623]'
                        }`}
                    />
                    {field.hasIcon && field.type !== 'date' && (
                        <Calendar className="absolute right-0 bottom-3 w-5 h-5 text-[#2D2623]/40 pointer-events-none group-focus-within:text-[#2D2623] transition-colors" />
                    )}
                </div>
                {errors[field.id as keyof FormData] && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-xs text-red-600 mt-1 ${montserrat.className}`}
                  >
                    {errors[field.id as keyof FormData]}
                  </motion.p>
                )}
              </motion.div>
            ))}
        </div>
      </div>

      <motion.div className="mt-12" variants={itemVariants}>
        <p className={`text-sm font-semibold mb-6 text-[#2D2623] uppercase tracking-wide opacity-80 ${montserrat.className}`}>Group Size</p>
        <div className="flex flex-wrap gap-8 mb-12">
          {[{l:'Solo', v:'solo'}, {l:'Duo', v:'duo'}, {l:'Small Circle (3-5)', v:'small'}, {l:'Large Group (>5)', v:'large'}].map((opt) => (
              <RadioOption
                key={opt.v}
                label={opt.l}
                value={opt.v}
                checked={formData.groupSize === opt.v}
                onChange={handleChange}
              />
          ))}
        </div>
      </motion.div>

      <motion.div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12" variants={itemVariants}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center justify-center px-12 py-5 border border-[#2D2623] rounded-full overflow-hidden bg-transparent hover:scale-105 active:scale-95 transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
              <div className={`flex items-center gap-2 relative z-10 text-lg font-medium tracking-wide ${tenorSans.className}`}>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
              </div>
          ) : (
              <>
                <span className={`relative z-10 text-lg font-medium tracking-wide transition-colors duration-300 group-hover:text-[#F8F5F0] ${tenorSans.className}`}>
                  Start Your Journey
                </span>
                <div className="absolute inset-0 bg-[#2D2623] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
          )}
        </button>
        <span className={`text-xs italic text-[#6B6560] block sm:inline opacity-80 ${montserrat.className}`}>
          *I will personally respond within 24 hours.
        </span>
      </motion.div>

      <motion.div className={`flex flex-wrap gap-x-10 gap-y-4 text-sm text-[#2D2623] ${montserrat.className}`} variants={itemVariants}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <Instagram className="w-5 h-5" />
          <span>@VyanAbimanyu</span>
        </a>
        <a href="tel:+6281238423177" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <Phone className="w-5 h-5" />
          <span>+62 812-3842-3177</span>
        </a>
        <a href="mailto:abimanyu@gmail.com" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <Mail className="w-5 h-5" />
          <span>abimanyu@gmail.com</span>
        </a>
      </motion.div>
    </motion.form>
  );
};

// Component: Quote Section
const QuoteSection = () => (
  <motion.section 
    className="text-center max-w-4xl mx-auto py-48 lg:py-64 px-6"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    <motion.p
      className={`text-2xl md:text-3xl lg:text-4xl text-[#6B6560] leading-relaxed mb-6 ${tenorSans.className}`}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      "Every inquiry is read with care. I personally look into to tides, weather, and hidden corners of island before responding, ensuring your vision is met with a perfect plan."
    </motion.p>
    <motion.p
      className={`text-sm text-[#2D2623] font-medium tracking-widest uppercase opacity-80 ${montserrat.className}`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
    >
      Vyan Abimanyu
    </motion.p>
  </motion.section>
);

// Main App Component
export default function InquiryPage() {
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  const handleFormSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      // Success
      setToast({ 
        show: true, 
        message: `Thank you, ${data.name}! We've received your inquiry and will respond within 24 hours.`,
        type: 'success'
      });

    } catch (error) {
      // Error
      console.error('Form submission error:', error);
      setToast({ 
        show: true, 
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again or contact us directly.',
        type: 'error'
      });
    } finally {
      // Hide toast after 5 seconds
      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8F5F0] text-[#2D2623] antialiased bg-grain selection:bg-[#2D2623] selection:text-[#F8F5F0]`}>
      {/* Brown Header - positioned absolutely at top with full width */}
      <Header variant="brown" />
      
      {/* Main content with optimized top padding to account for transparent header */}
      <section className="px-6 lg:px-[60px] pt-8 pb-0 lg:pb-20">
        <div className="max-w-[1400px] mx-auto">

          <main className="flex flex-col lg:flex-row relative justify-between items-start mb-16 gap-12 lg:gap-24">
          {/* Left Column: Content */}
          <div className="w-full lg:flex-1 lg:max-w-[600px] z-10 relative mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h1 className={`text-4xl lg:text-[56px] leading-[1.1] mb-6 text-[#2D2623] ${tenorSans.className}`}>
                  Start a Conversation
              </h1>
              <p className={`text-base text-[#6B6560] max-w-[480px] mb-12 leading-relaxed ${montserrat.className}`}>
                Your journey doesn't begin with a booking, but with a vision. Tell me what you seek, and let's design a path together.
              </p>
            </motion.div>

            <ContactForm onSubmit={handleFormSubmit} />
          </div>

          {/* Right Column: Image */}
          <motion.div 
            className="relative w-full lg:w-[45vw] lg:h-[800px] h-[500px] rounded-l-lg overflow-hidden shadow-2xl lg:absolute lg:top-[6rem] lg:right-0 lg:-mr-[60px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          >
             {/* Note: In a real Next.js app, consider using <Image /> for optimization */}
            <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full"
            >
                <img
                src="/inquiry-pic.webp"
                alt="Traditional Balinese Textiles"
                className="w-full h-full object-cover object-center"
                />
            </motion.div>
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-[#2D2623]/10 mix-blend-multiply pointer-events-none"></div>
          </motion.div>
        </main>
        </div>
      </section>

      <QuoteSection />

      {/* Footer */}
      <footer className="py-20 px-6 lg:px-[60px] border-t border-[#2D2623]/10 text-[#6B6560]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-16 gap-8 lg:gap-0 text-center lg:text-left">
            <div>
              <h3 className={`text-3xl mb-6 text-[#6B6560] ${tenorSans.className}`}>Vyan Abimanyu</h3>
              <p className="text-[#6B6560]">Bali, Indonesia</p>
            </div>
            <div className="max-w-[400px] text-[#6B6560] leading-relaxed lg:text-right">
              <p>Your local companion for a deeper connection. Dedicated to exploring the soul of Bali through the eyes of a friend, where every curated moment is anchored in safety, authenticity, and heart.</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0 text-gray-500">
             <p className="text-center lg:text-left">&copy; 2026 Web by <Link href="https://flaat.studio" target="_blank" rel="noopener noreferrer" className='font-semibold hover:text-[#2D2623] transition-colors'>Flaat Studio</Link></p>
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </footer>

      <Toast
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}