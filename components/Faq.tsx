'use client';

import React, { useState } from 'react';
import { motion, easeOut } from 'framer-motion';

const Faq = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is ADmyBRAND?",
      answer: "ADmyBRAND is a programmatic ad-exchange that lets you discover and book ad spaces across outdoor, digital, mobile, and print media."
    },
    {
      question: "Can I use ADmyBRAND without an agency?",
      answer: "Absolutely! Our platform is designed for both professionals and businesses to book ad spaces directly."
    },
    {
      question: "Do I need to install software?",
      answer: "No, everything is browser-based. You can also use the ADify mobile app for managing campaigns."
    },
    {
      question: "Is real-time analytics available?",
      answer: "Yes, you'll get live tracking and personalized performance reports for every campaign."
    },
    {
      question: "What is the White Label Program?",
      answer: "It allows ad sellers without their own platform to use ours for managing clients under their own branding."
    }
  ];

  const toggleItem = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const titleVariants = {
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
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Gradient overlays */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(143, 74, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(245, 191, 160, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(37, 21, 90, 0.2) 0%, transparent 50%)
          `
        }}
      ></div>

      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen p-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-15 items-start">
          {/* Title */}
          <motion.div 
            className="text-center lg:text-left"
            variants={titleVariants}
          >
            <h2 className="text-4xl lg:text-6xl font-black leading-tight text-white mb-0">
              Frequently asked<br />questions
            </h2>
          </motion.div>
          
          {/* FAQ Items */}
          <motion.div 
            className="flex flex-col gap-0"
            variants={containerVariants}
          >
            {faqData.map((item, index) => (
              <motion.div 
                key={index}
                className={`border-b border-purple-500/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-transparent ${
                  activeItem === index ? 'active' : ''
                }`}
                variants={itemVariants}
                style={{
                  animation: `fadeIn 0.6s ease forwards ${index * 0.1}s`
                }}
              >
                <button 
                  className="w-full bg-transparent border-none text-white text-lg font-medium py-6 text-left cursor-pointer flex justify-between items-center transition-all duration-300 hover:text-purple-400 relative"
                  onClick={() => toggleItem(index)}
                >
                  {item.question}
                  <span className="text-purple-400 text-2xl font-light transition-transform duration-300 ml-5 flex-shrink-0">
                    {activeItem === index ? '×' : '+'}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 text-white/80 leading-relaxed text-sm ${
                    activeItem === index 
                      ? 'max-h-48 pb-6' 
                      : 'max-h-0'
                  }`}
                >
                  {item.answer}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .active button {
          color: #8f4aff;
        }
      `}</style>
    </section>
  );
};

export default Faq;
