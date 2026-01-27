import Link from "next/link";
import React from "react";
import { Tenor_Sans } from 'next/font/google'
import { Instagram, Facebook, Twitter } from 'lucide-react'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] })

const Footer = () => {
  return (
    <footer className="py-20 px-6 lg:px-[60px] border-t border-gray-200">
      <div className=" mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-start items-center text-center md:text-left mb-16 gap-8">
          <div>
            <h3 className={`text-3xl mb-6 text-[#6B6560] ${tenorSans.className}`}>Vyan Abimanyu</h3>
            <p className="text-[#6B6560]">Bali, Indonesia</p>
          </div>
          <div className="max-w-[400px] text-[#6B6560] leading-relaxed text-center md:text-right">
            <p>I’m here to help you find the quiet moments, real connections, and hidden spots that make Bali unforgettable.
Every trip I plan is built on safety, authenticity, and a little bit of soul.

</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 gap-4 text-center">
          <p>&copy; 2026 Web by <Link href="https://flaat.studio" target="_blank" rel="noopener noreferrer" className='font-semibold hover:text-[#2D2623] transition-colors'>Flaat Studio</Link></p>
          <div className="flex gap-6">
            <Instagram className="w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
            <Facebook className="w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-[#2D2623] transition-colors" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;