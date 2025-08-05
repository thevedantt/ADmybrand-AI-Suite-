'use client';

import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { Download, Play, BookOpen } from 'lucide-react';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  // Always visible for dev/testing
  useEffect(() => {
    setVisible(true);
  }, []);

  const handleCTAAction = (action: string) => {
    switch (action) {
      case 'download':
        window.open('https://play.google.com/store/apps/details?id=com.admybrand.adify&pli=1', '_blank');
        break;
      case 'demo':
        // Scroll to demo section or open demo modal
        const demoSection = document.getElementById('demo');
        if (demoSection) {
          demoSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'login':
        window.open('https://fr.admybrand.com/', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'flex max-w-fit fixed top-10 inset-x-0 mx-auto rounded-full z-[5000] px-4 py-2 items-center justify-center space-x-4',
          'border border-[#8f4aff]/40 shadow-[0_4px_30px_rgba(143,74,255,0.3)] backdrop-blur-md bg-gradient-to-r from-[#25155a]/80 via-[#8f4aff]/30 to-[#000]/60',
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={`nav-${idx}`}
            href={navItem.link}
            className={cn(
              'relative flex items-center gap-1 text-sm text-white/80 hover:text-white transition-all',
              'px-3 py-1.5 rounded-full hover:bg-white/10'
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
          </a>
        ))}

        {/* CTA Buttons */}
        <div className="flex items-center gap-2 ml-4">
          <button 
            onClick={() => handleCTAAction('login')}
            className="bg-gradient-to-r from-[#8f4aff] to-[#f5bfa0] text-white font-medium text-sm px-5 py-2 rounded-full shadow-[0_0_20px_rgba(143,74,255,0.4)] transition-all hover:scale-105"
          >
            Login
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
