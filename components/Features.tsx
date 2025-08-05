'use client';

import React, { useEffect, useRef } from 'react';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { motion, easeOut } from 'framer-motion';

export default function Features() {
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

  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: easeOut
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      ></div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
      
      {/* Features Cards */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-12"
          variants={headingVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Powerful Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Everything you need to create, manage, and optimize your marketing campaigns
          </motion.p>
        </motion.div>
        <motion.div
          variants={itemVariants}
        >
          <HoverEffect />
        </motion.div>
      </motion.div>
    </section>
  );
}
