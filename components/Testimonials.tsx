import React from 'react';
import { AnimatedTestimonials } from './ui/animated-testimonials';
import { motion, easeOut } from 'framer-motion';

const Testimonials = () => {
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

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <motion.div 
        className="relative z-10 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center text-white"
          variants={itemVariants}
        >
          Testimonials
        </motion.h2>
        <motion.div
          variants={itemVariants}
        >
          <AnimatedTestimonials autoplay={true} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
