'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Blog = () => {
  const blogRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const featuredPosts = [
    {
      id: 1,
      emoji: "📊",
      title: "Powering Campaigns with Data",
      author: "Rahul Mehra",
      description: "Dive into how real-time analytics and performance heatmaps are helping brands make smarter advertising decisions—faster than ever.",
      bgColor: "bg-gradient-to-br from-[#8f4aff] to-[#25155a]"
    },
    {
      id: 2,
      emoji: "🎯",
      title: "Picking the Perfect Ad Spot",
      author: "Ananya Iyer",
      description: "Confused by too many ad options? Learn how our intelligent filters help you zero in on high-impact locations tailored to your brand goals.",
      bgColor: "bg-gradient-to-br from-[#f5bfa0] to-[#8f4aff]"
    },
    {
      id: 3,
      emoji: "📱",
      title: "Meet the ADify App",
      author: "Karan Deshmukh",
      description: "Your ad manager on the move—discover how the ADify app lets you plan, book, and monitor campaigns, all from your smartphone.",
      bgColor: "bg-gradient-to-br from-[#25155a] to-[#000]"
    },
    {
      id: 4,
      emoji: "🔗",
      title: "Why White Label Portals Matter",
      author: "Priya Shah",
      description: "Learn how small sellers are scaling faster and reaching more clients using our white-label advertising portals—no tech headaches required.",
      bgColor: "bg-gradient-to-br from-[#8f4aff] via-[#25155a] to-[#f5bfa0]"
    },
    {
      id: 5,
      emoji: "📺",
      title: "Traditional vs. Programmatic Buying",
      author: "Aarav Bansal",
      description: "Not sure whether to go digital or stick to classic media? We break down the pros, cons, and best use-cases for each.",
      bgColor: "bg-gradient-to-br from-[#f5bfa0] to-[#25155a]"
    },
    {
      id: 6,
      emoji: "🌆",
      title: "What's Next for Outdoor Advertising?",
      author: "Sneha Kulkarni",
      description: "From static billboards to location-based digital ads—take a look at how outdoor advertising is evolving across India and beyond.",
      bgColor: "bg-gradient-to-br from-[#25155a] via-[#8f4aff] to-[#f5bfa0]"
    }
  ];

  useEffect(() => {
    const blog = blogRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!blog || !header || cards.length === 0) return;

    // Set initial state
    gsap.set(header, {
      opacity: 0,
      y: 50
    });

    gsap.set(cards, {
      opacity: 0,
      y: 100,
      scale: 0.8
    });

    // Create scroll trigger for blog section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blog,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate header first
    tl.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Stagger animation for cards
    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15
    }, "-=0.4");

    // Hover effects for cards
    cards.forEach(card => {
      if (!card) return;

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.3,
          ease: "power2.out",
          scale: 1.05,
          y: -10,
          boxShadow: "0 20px 40px rgba(143, 74, 255, 0.3)"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.3,
          ease: "power2.out",
          scale: 1,
          y: 0,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
        });
      });
    });

    return () => {
      // Cleanup
      cards.forEach(card => {
        if (!card) return;
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div ref={blogRef} className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Weekly insights and expert advice from our seasoned team to elevate your knowledge.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, index) => (
            <div 
              key={post.id} 
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group cursor-pointer"
            >
              {/* Card Image/Header */}
              <div className={`${post.bgColor} rounded-t-xl h-48 flex items-center justify-center relative overflow-hidden`}>
                <div className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                  {post.emoji}
                </div>
              </div>
              
              {/* Card Content */}
              <div className="bg-[#25155a] rounded-b-xl p-6 border-l border-r border-b border-[#8f4aff] group-hover:bg-[#1a0e3d] transition-colors duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-[#8f4aff] rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">A</span>
                  </div>
                  <span className="text-[#f5bfa0] text-sm font-medium">{post.author}</span>
                </div>
                
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#8f4aff] transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;