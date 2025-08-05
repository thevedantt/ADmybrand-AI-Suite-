'use client';

import { 
  MapPin, 
  Link, 
  Phone, 
  Megaphone, 
  BookOpen, 
  Volume2, 
  Mail,
  Home,
  Star,
  DollarSign,
  HelpCircle,
  FileText,
  Map,
  Headphones,
  Users,
  UserPlus,
  Building,
  List,
  FileBarChart,
  Book,
  Code,
  Shield,
  ScrollText,
  AlertTriangle,
  Github,
  Linkedin,
  Facebook,
  Instagram
} from "lucide-react";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleQuickLink = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const footer = footerRef.current;
    const sections = sectionRefs.current.filter(Boolean);

    if (!footer || sections.length === 0) return;

    // Set initial state
    gsap.set(sections, {
      opacity: 0,
      y: 30
    });

    // Create scroll trigger for footer
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Stagger animation for sections
    tl.to(sections, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1
    });

    // Hover effects for links
    sections.forEach(section => {
      if (!section) return;
      
      const links = section.querySelectorAll('a, button');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            duration: 0.3,
            ease: "power2.out",
            scale: 1.05,
            y: -2
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            duration: 0.3,
            ease: "power2.out",
            scale: 1,
            y: 0
          });
        });
      });
    });

    return () => {
      // Cleanup
      sections.forEach(section => {
        if (!section) return;
        const links = section.querySelectorAll('a, button');
        links.forEach(link => {
          link.removeEventListener('mouseenter', () => {});
          link.removeEventListener('mouseleave', () => {});
        });
      });
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative text-white overflow-hidden" 
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          
          {/* About Section */}
          <div 
            ref={(el) => {
              sectionRefs.current[0] = el;
            }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 mr-2 text-white drop-shadow-lg" />
              <h3 className="text-lg font-semibold text-white drop-shadow-lg">About</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
              ADmyBRAND is a tech-age solution for omnichannel advertising across outdoor, 
              influencer, mobile, radio, TV, and newspaper platforms.
            </p>
          </div>

          {/* Quick Links */}
          <div ref={(el) => {
            sectionRefs.current[1] = el;
          }}>
            <div className="flex items-center mb-4">
              <Link className="h-5 w-5 mr-2 text-white drop-shadow-lg" />
              <h3 className="text-lg font-semibold text-white drop-shadow-lg">Quick Links</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleQuickLink('home')}
                  className="text-white/80 hover:text-white transition-all duration-200 flex items-center drop-shadow-md hover:drop-shadow-lg hover:scale-105 w-full text-left"
                >
                  <Home className="h-4 w-4 mr-2" />Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink('features')}
                  className="text-white/80 hover:text-white transition-all duration-200 flex items-center drop-shadow-md hover:drop-shadow-lg hover:scale-105 w-full text-left"
                >
                  <Star className="h-4 w-4 mr-2" />Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink('pricing')}
                  className="text-white/80 hover:text-white transition-all duration-200 flex items-center drop-shadow-md hover:drop-shadow-lg hover:scale-105 w-full text-left"
                >
                  <DollarSign className="h-4 w-4 mr-2" />Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink('faq')}
                  className="text-white/80 hover:text-white transition-all duration-200 flex items-center drop-shadow-md hover:drop-shadow-lg hover:scale-105 w-full text-left"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink('blog')}
                  className="text-white/80 hover:text-white transition-all duration-200 flex items-center drop-shadow-md hover:drop-shadow-lg hover:scale-105 w-full text-left"
                >
                  <FileText className="h-4 w-4 mr-2" />Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink('testimonials')}
                  className="text-white/80 hover:text-white transition-all duration-200 flex items-center drop-shadow-md hover:drop-shadow-lg hover:scale-105 w-full text-left"
                >
                  <Map className="h-4 w-4 mr-2" />Testimonials
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Accordion Section */}
        <div ref={(el) => {
          sectionRefs.current[2] = el;
        }} className="mt-12 pt-8 border-t border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Quick Information</h3>
            <p className="text-white/70">Get detailed information about our services</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="support"
            >
              <AccordionItem value="support" className="border-white/20">
                <AccordionTrigger className="text-white hover:text-[#f5bfa0] transition-colors">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Support Services
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance text-white/80">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Headphones className="h-4 w-4 text-[#f5bfa0]" />
                      <div>
                        <h4 className="font-semibold text-white">Help Desk</h4>
                        <p className="text-sm">24/7 technical support and troubleshooting assistance for all platform-related issues.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-[#f5bfa0]" />
                      <div>
                        <h4 className="font-semibold text-white">Customer Care</h4>
                        <p className="text-sm">Personalized assistance with account management, billing, and general inquiries.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <UserPlus className="h-4 w-4 text-[#f5bfa0]" />
                      <div>
                        <h4 className="font-semibold text-white">Dedicated Support</h4>
                        <p className="text-sm">Premium support with dedicated account managers for Enterprise customers.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="money" className="border-white/20">
                <AccordionTrigger className="text-white hover:text-[#f5bfa0] transition-colors">
                  <div className="flex items-center">
                    <Megaphone className="h-4 w-4 mr-2" />
                    Make Money Opportunities
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance text-white/80">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <UserPlus className="h-4 w-4 text-[#f5bfa0]" />
                      <div>
                        <h4 className="font-semibold text-white">Refer a Friend</h4>
                        <p className="text-sm">Earn rewards by referring friends and colleagues to ADmyBRAND platform.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-[#f5bfa0]" />
                      <div>
                        <h4 className="font-semibold text-white">Become an Affiliate</h4>
                        <p className="text-sm">Join our affiliate program and earn commissions for every successful referral.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="h-4 w-4 text-[#f5bfa0]" />
                      <div>
                        <h4 className="font-semibold text-white">List Your Adspaces</h4>
                        <p className="text-sm">Monetize your advertising inventory by listing it on our platform.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="resources" className="border-white/20">
                <AccordionTrigger className="text-white hover:text-[#f5bfa0] transition-colors">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Resources & Tools
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance text-white/80">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FileBarChart className="h-4 w-4 text-[#f5bfa0]" />
                      <div>
                        <h4 className="font-semibold text-white">Case Studies</h4>
                        <p className="text-sm">Real-world examples of successful campaigns and ROI improvements.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Book className="h-4 w-4 text-[#f5bfa0]" />
                      <div>
                        <h4 className="font-semibold text-white">Brochures</h4>
                        <p className="text-sm">Detailed product information and feature guides for all platform capabilities.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Code className="h-4 w-4 text-[#f5bfa0]" />
                      <div>
                        <h4 className="font-semibold text-white">API for Developers</h4>
                        <p className="text-sm">Comprehensive API documentation and integration tools for developers.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="pricing" className="border-white/20">
                <AccordionTrigger className="text-white hover:text-[#f5bfa0] transition-colors">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Pricing & Plans
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance text-white/80">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#f5bfa0]"></div>
                      <div>
                        <h4 className="font-semibold text-white">Basic Plan - $10/month</h4>
                        <p className="text-sm">Perfect for individual advertisers with up to 10 ad listings and basic tools.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#8f4aff]"></div>
                      <div>
                        <h4 className="font-semibold text-white">Business Plan - $20/month</h4>
                        <p className="text-sm">Ideal for growing agencies with up to 100 listings and white-label access.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#f5bfa0] to-[#8f4aff]"></div>
                      <div>
                        <h4 className="font-semibold text-white">Enterprise Plan - $40/month</h4>
                        <p className="text-sm">Unlimited access with dedicated support and API integration for large teams.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Legal and Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 pt-8 border-t border-white/20">
          
          {/* Legal */}
          <div ref={(el) => {
            sectionRefs.current[3] = el;
          }}>
            <div className="flex items-center mb-4">
              <Volume2 className="h-5 w-5 mr-2 text-white drop-shadow-lg" />
              <h3 className="text-lg font-semibold text-white drop-shadow-lg">Legal</h3>
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-all duration-200 flex items-center drop-shadow-md hover:drop-shadow-lg hover:scale-105"><Shield className="h-4 w-4 mr-2" />Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-all duration-200 flex items-center drop-shadow-md hover:drop-shadow-lg hover:scale-105"><ScrollText className="h-4 w-4 mr-2" />Terms of Service</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-all duration-200 flex items-center drop-shadow-md hover:drop-shadow-lg hover:scale-105"><AlertTriangle className="h-4 w-4 mr-2" />Grievance Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div ref={(el) => {
            sectionRefs.current[4] = el;
          }}>
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 mr-2 text-white drop-shadow-lg" />
              <h3 className="text-lg font-semibold text-white drop-shadow-lg">Subscribe to Newsletter</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all duration-200"
              />
              <button className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg transition-all duration-200 font-medium whitespace-nowrap text-white hover:scale-105 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div ref={(el) => {
          sectionRefs.current[5] = el;
        }} className="mt-8 pt-8 border-t border-white/20 text-center">
          {/* Social Media Links */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            <a 
              href="https://www.facebook.com/admybrand/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110"
              title="Follow us on Facebook"
            >
              <Facebook className="h-5 w-5 text-white" />
            </a>
            <a 
              href="https://www.instagram.com/Admybrand" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110"
              title="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <a 
              href="https://www.linkedin.com/company/admybrand/?originalSubdomain=in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110"
              title="Follow us on LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </div>
          
          <p className="text-white/70 text-sm drop-shadow-md mb-4">
            © 2025 ADmyBRAND, Inc.
          </p>
          
          {/* Developer Credits */}
          <div className="flex items-center justify-center space-x-2 text-white/60 text-sm">
            <span>Developed by</span>
            <a 
              href="https://github.com/thevedantt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              <Github className="h-4 w-4" />
              <span className="font-medium">Vedant Talekar</span>
            </a>
            <span>•</span>
            <a 
              href="https://www.linkedin.com/in/vedant-talekar-055910208/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              <Linkedin className="h-4 w-4" />
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}