'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Download, Building2, Home, Rocket, Newspaper, ShoppingBag, Utensils } from 'lucide-react';
import { motion, easeOut } from 'framer-motion';
import DemoRequestModal from '@/components/ui/demo-request-modal';

export default function HeroSection() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const industries = [
    { name: 'FMCG', icon: Building2 },
    { name: 'Real Estate', icon: Home },
    { name: 'Startups', icon: Rocket },
    { name: 'Media Agencies', icon: Newspaper },
    { name: 'Retail', icon: ShoppingBag },
    { name: 'Hospitality', icon: Utensils }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  const industryVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  return (
    <section className="relative overflow-hidden text-white min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/bg.jpg)' }}></div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>

      {/* Header with Logo and Download Button */}
      <motion.div 
        className="relative z-10 flex justify-between items-center px-6 py-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo on the left */}
        <motion.div 
          className="flex items-center"
          variants={logoVariants}
        >
          <a 
            href="https://fr.admybrand.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-105 transition-all duration-300"
          >
            <Image 
              src="/web_logo.svg" 
              alt="ADmyBRAND Logo" 
              width={170} 
              height={26}
              className="h-8 w-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
            />
          </a>
        </motion.div>

        {/* Download Button on the right */}
        <motion.div variants={buttonVariants}>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 flex items-center gap-2"
            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.admybrand.adify&pli=1', '_blank')}
          >
            <Download className="h-4 w-4" />
            Download ADmyBRAND
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 py-12 text-center mt-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Heading */}
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
          variants={headingVariants}
        >
          AI-Powered Campaigns. <br className="hidden md:inline" />
          One Dashboard.
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          className="mt-6 max-w-2xl mx-auto text-lg text-gray-300"
          variants={itemVariants}
        >
          Launch, manage, and optimize omni-channel marketing campaigns in just a few clicks –
          powered by intelligent automation and deep insights.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="mt-10 flex justify-center items-center gap-6 flex-wrap"
          variants={itemVariants}
        >
          <Button variant="glow" size="lg" className="px-8 py-3">
            Get Started ✦
          </Button>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20"
            onClick={() => setIsDemoModalOpen(true)}
          >
            Request a Demo
          </Button>
        </motion.div>

        {/* Industry Categories */}
        <motion.div 
          className="mt-16"
          variants={itemVariants}
        >
          <motion.p 
            className="text-sm text-gray-400 mb-6"
            variants={itemVariants}
          >
            Trusted by leading industries
          </motion.p>
          <div className="flex justify-center items-center flex-wrap gap-8 opacity-90">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
                  variants={industryVariants}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-sm font-medium">{industry.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Demo Request Modal */}
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </section>
  );
}
