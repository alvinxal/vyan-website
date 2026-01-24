import { Quicksand, Tenor_Sans } from "next/font/google";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const menu = [
  { title: "Home", link: "/" },
  { title: "Destination", link: "/destination" },
  { title: "Inquiry", link: "/inquiry" },
];

interface HeaderProps {
  variant?: 'transparent' | 'default';
}

const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Disable scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const textColor = variant === 'transparent' ? 'text-white' : 'text-[#2D2623]';
  const positionClass = variant === 'transparent' ? 'absolute top-0 w-full z-20' : 'relative mb-16 lg:mb-20';

  return (
    <>
      <motion.header 
        className={`${positionClass} flex justify-between items-center px-6 lg:px-[60px] py-10`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <Link href='/' className={`text-xl md:text-2xl font-normal tracking-wide ${textColor} ${tenorSans.className}`}>
          Vyan Abimanyu
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-10">
          {menu.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              className={`${textColor} text-sm font-normal hover:opacity-70 transition-opacity`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              {item.title}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`lg:hidden ml-auto flex flex-col justify-center items-end gap-1.5 z-50 p-2 ${textColor}`}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 relative">
             <span className={`block absolute h-0.5 w-6 ${variant === 'transparent' ? 'bg-white' : 'bg-[#2D2623]'} transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-0 !bg-[#2D2623]' : '-translate-y-2'}`}></span>
             <span className={`block absolute h-0.5 w-6 ${variant === 'transparent' ? 'bg-white' : 'bg-[#2D2623]'} transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'} translate-y-0`}></span>
             <span className={`block absolute h-0.5 w-6 ${variant === 'transparent' ? 'bg-white' : 'bg-[#2D2623]'} transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 translate-y-0 !bg-[#2D2623]' : 'translate-y-2'}`}></span>
          </div>
        </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#F8F5F0]/95 backdrop-blur-md lg:hidden touch-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
            >


              <nav className="flex flex-col items-center gap-8 mb-12">
                {menu.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${tenorSans.className} text-4xl md:text-5xl text-[#2D2623] hover:opacity-70 transition-all duration-300`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {item.title}
                  </motion.a>
                ))}
              </nav>

              {/* Social Icons */}
              <motion.div 
                className="flex gap-8 text-[#2D2623]/60"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <a href="#" className="hover:text-[#2D2623] transition-colors hover:scale-110 duration-300">
                  <Instagram size={24} strokeWidth={1.5} />
                </a>
                <a href="#" className="hover:text-[#2D2623] transition-colors hover:scale-110 duration-300">
                  <Facebook size={24} strokeWidth={1.5} />
                </a>
                <a href="#" className="hover:text-[#2D2623] transition-colors hover:scale-110 duration-300">
                  <Twitter size={24} strokeWidth={1.5} />
                </a>
              </motion.div>

              {/* Copyright */}
              <motion.div 
                className="absolute bottom-8 text-[#2D2623]/30 text-xs tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                &copy; 2026 Vyan Abimanyu
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
