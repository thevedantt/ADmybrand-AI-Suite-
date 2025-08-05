'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, ChevronUp, ChevronDown, Home, Star, DollarSign, HelpCircle, FileText, Map } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

const ChatbotBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm ADmyBRAND Assistant. How can I help you today? You can ask me about our features, pricing, or get help navigating the platform.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: 'home',
      label: 'Go to Home',
      icon: Home,
      action: () => handleQuickLink('home')
    },
    {
      id: 'features',
      label: 'View Features',
      icon: Star,
      action: () => handleQuickLink('features')
    },
    {
      id: 'pricing',
      label: 'Check Pricing',
      icon: DollarSign,
      action: () => handleQuickLink('pricing')
    },
    {
      id: 'faq',
      label: 'FAQ Section',
      icon: HelpCircle,
      action: () => handleQuickLink('faq')
    },
    {
      id: 'blog',
      label: 'Read Blog',
      icon: FileText,
      action: () => handleQuickLink('blog')
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: Map,
      action: () => handleQuickLink('testimonials')
    }
  ];

  const handleQuickLink = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsOpen(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, true);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the actual API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      addMessage(data.response, false);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage("I'm sorry, I'm having trouble connecting right now. Please try again later.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Main Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
                             className="absolute bottom-16 right-0 w-80 h-[500px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
                             {/* Header */}
               <div className="bg-white border-b border-gray-100 p-4">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="relative">
                       <Image 
                         src="/chabot.png" 
                         alt="ADmyBRAND Assistant" 
                         width={32} 
                         height={32} 
                         className="rounded-full"
                       />
                       <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                     </div>
                     <div>
                       <span className="font-semibold text-gray-900">ADmyBRAND Assistant</span>
                       <p className="text-xs text-gray-500">Online • Usually responds instantly</p>
                     </div>
                   </div>
                   <button
                     onClick={() => setIsOpen(false)}
                     className="hover:bg-gray-100 rounded-full p-2 transition-colors"
                   >
                     <X className="h-4 w-4 text-gray-600" />
                   </button>
                 </div>
               </div>

                             {/* Messages */}
               <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80 bg-gray-50">
                 {messages.map((message) => (
                   <motion.div
                     key={message.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                   >
                     {!message.isUser && (
                       <div className="flex-shrink-0 mr-2">
                         <Image 
                           src="/chabot.png" 
                           alt="Assistant" 
                           width={24} 
                           height={24} 
                           className="rounded-full"
                         />
                       </div>
                     )}
                     <div
                       className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                         message.isUser
                           ? 'bg-[#8f4aff] text-white'
                           : 'bg-white text-gray-800 border border-gray-200'
                       }`}
                     >
                       <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                     </div>
                   </motion.div>
                 ))}
                 
                 {isLoading && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="flex justify-start"
                   >
                     <div className="flex-shrink-0 mr-2">
                       <Image 
                         src="/chabot.png" 
                         alt="Assistant" 
                         width={24} 
                         height={24} 
                         className="rounded-full"
                       />
                     </div>
                     <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
                       <div className="flex space-x-1">
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                       </div>
                     </div>
                   </motion.div>
                 )}
                 <div ref={messagesEndRef} />
               </div>

                             {/* Quick Actions */}
               <div className="p-4 bg-white border-t border-gray-100">
                 <div className="mb-4">
                   <p className="text-xs font-medium text-gray-500 mb-2">Quick Actions</p>
                   <div className="grid grid-cols-3 gap-2">
                     {quickActions.slice(0, 6).map((action) => (
                       <button
                         key={action.id}
                         onClick={action.action}
                         className="flex flex-col items-center gap-1 p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
                       >
                         <action.icon className="h-3 w-3 text-[#8f4aff]" />
                         <span className="text-gray-600 font-medium">{action.label}</span>
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Input */}
                 <div className="flex gap-2">
                   <input
                     ref={inputRef}
                     type="text"
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyPress={handleKeyPress}
                     placeholder="Type your message..."
                     className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8f4aff]/20 focus:border-[#8f4aff] bg-gray-50"
                   />
                   <button
                     onClick={handleSendMessage}
                     disabled={!inputValue.trim() || isLoading}
                     className="px-4 py-3 bg-[#8f4aff] text-white rounded-xl hover:bg-[#7c3aed] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                   >
                     <Send className="h-4 w-4" />
                   </button>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

                 {/* Toggle Button */}
         <motion.button
           onClick={() => setIsOpen(!isOpen)}
           className="w-16 h-16 bg-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center border-2 border-gray-200 hover:border-[#8f4aff]/30"
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
         >
           <Image 
             src="/chabot.png" 
             alt="ADmyBRAND Assistant" 
             width={48} 
             height={48} 
             className="rounded-full"
           />
         </motion.button>
      </motion.div>
    </>
  );
};

export default ChatbotBubble; 