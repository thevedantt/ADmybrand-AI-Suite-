'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Send, CheckCircle } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSubmitted(true);
        
        // Trigger video download
        if (data.downloadUrl) {
          const link = document.createElement('a');
          link.href = data.downloadUrl;
          link.download = 'ADmyBRAND_Demo_Video.mp4';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({ name: '', email: '' });
        }, 3000);
      } else {
        throw new Error('Failed to submit demo request');
      }
    } catch (error) {
      console.error('Demo request error:', error);
      alert('Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#8f4aff] to-[#f5bfa0] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Demo</h2>
                                     <p className="text-gray-600">
                     Get a personalized video demo of ADmyBRAND downloaded directly to your device
                   </p>
                </div>

                                 {/* Form */}
                 <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Full Name *
                     </label>
                     <div className="relative">
                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                       <Input
                         type="text"
                         name="name"
                         value={formData.name}
                         onChange={handleInputChange}
                         required
                         className="w-full pl-10 pr-4 py-3"
                         placeholder="Enter your full name"
                       />
                     </div>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Email Address *
                     </label>
                     <div className="relative">
                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                       <Input
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleInputChange}
                         required
                         className="w-full pl-10 pr-4 py-3"
                         placeholder="Enter your email address"
                       />
                     </div>
                   </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#8f4aff] to-[#f5bfa0] text-white hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Demo...
                      </div>
                                         ) : (
                       <div className="flex items-center gap-2">
                         <Send className="h-4 w-4" />
                         Download Demo Video
                       </div>
                     )}
                  </Button>
                </form>

                                 <p className="text-xs text-gray-500 text-center mt-4">
                   Your demo video will be downloaded immediately after submission
                 </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
                   Demo Video Downloaded!
                 </h3>
                 <p className="text-gray-600">
                   Thank you for your interest! Your ADmyBRAND demo video has been downloaded to your device.
                 </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 