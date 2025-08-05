'use client';

import HeroSectionOne from "@/components/hero-section-demo-1";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Features from "@/components/Features";
import Image from "next/image";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import Faq from "@/components/Faq";
import ChatbotBubble from "@/components/ui/chatbot-bubble";

export default function Home() {
  const navItems = [
    { name: "Home", link: "#home" },
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Blog", link: "#blog" },
    { name: "FAQ", link: "#faq" },
  ];

  const handleDownloadApp = () => {
    window.open('https://play.google.com/store/apps/details?id=com.admybrand.adify&pli=1', '_blank');
  };

  const handleRequestDemo = () => {
    // Demo request logic
    console.log('Demo requested');
  };

  const handleGetStarted = () => {
    // Get started logic
    console.log('Get started clicked');
  };

  const handleLogin = () => {
    // Login logic
    console.log('Login clicked');
  };

  return (
    <div>
      <FloatingNav navItems={navItems} />
      <section id="home"><HeroSectionOne /></section>
      <section id="features"><Features /></section>
      <section id="pricing"><Pricing /></section>
      <section id="testimonials"><Testimonials /></section>
      <section id="blog"><Blog /></section>
      <section id="faq"><Faq /></section>
      <Footer />
      <ChatbotBubble />
    </div>
  );
}
