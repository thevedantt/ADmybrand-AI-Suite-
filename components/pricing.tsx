'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Calculator, TrendingUp, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

const Pricing = () => {
  const pricingCardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Calculator state
  const [calculatorValues, setCalculatorValues] = useState({
    adSpaces: 50,
    campaigns: 10,
    teamMembers: 3,
    storage: 50
  });

  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const plans = [
    {
      name: 'Basic Plan',
      price: '$10',
      period: 'per month',
      description: 'Best for individual advertisers & freelancers',
      features: [
        'Access to hyperlocal ad spaces',
        'Basic campaign management tools',
        'Up to 10 ad listings/month',
        '10GB storage for creatives',
        'Standard email support'
      ],
      buttonText: 'Get started',
      isPopular: false,
      buttonClass: 'bg-[#25155a]/60 hover:bg-[#25155a]/80 text-white border border-white/20',
      basePrice: 10,
      adSpaceLimit: 10,
      campaignLimit: 5,
      storageLimit: 10
    },
    {
      name: 'Business Plan',
      price: '$20',
      period: 'per month',
      description: 'Best for growing ad agencies',
      features: [
        'Includes everything in Basic',
        'Up to 100 ad listings/month',
        'White-label portal access',
        'Real-time performance tracking',
        'Priority email + chat support'
      ],
      buttonText: 'Get started',
      isPopular: true,
      buttonClass: 'bg-gradient-to-r from-[#f5bfa0] to-[#8f4aff] hover:from-[#f5bfa0]/90 hover:to-[#8f4aff]/90 text-white shadow-lg shadow-[#8f4aff]/30',
      basePrice: 20,
      adSpaceLimit: 100,
      campaignLimit: 20,
      storageLimit: 50
    },
    {
      name: 'Enterprise Plan',
      price: '$40',
      period: 'per month',
      description: 'Best for enterprise media partners & API users',
      features: [
        'Includes everything in Business',
        'Unlimited ad listings',
        'Dedicated account manager',
        'Access to campaign APIs',
        '24/7 support and SLAs'
      ],
      buttonText: 'Get started',
      isPopular: false,
      buttonClass: 'bg-[#25155a]/60 hover:bg-[#25155a]/80 text-white border border-white/20',
      basePrice: 40,
      adSpaceLimit: -1, // Unlimited
      campaignLimit: -1, // Unlimited
      storageLimit: 200
    }
  ];

  // Calculate pricing based on usage
  const calculatePrice = (values: typeof calculatorValues) => {
    const { adSpaces, campaigns, teamMembers, storage } = values;
    
    // Find the best plan based on usage
    let bestPlan = plans[0];
    let totalCost = 0;

    // Check if Enterprise is needed (unlimited)
    if (adSpaces > 100 || campaigns > 20 || storage > 50) {
      bestPlan = plans[2]; // Enterprise
      totalCost = bestPlan.basePrice;
    } else if (adSpaces > 10 || campaigns > 5 || storage > 10) {
      bestPlan = plans[1]; // Business
      totalCost = bestPlan.basePrice;
    } else {
      bestPlan = plans[0]; // Basic
      totalCost = bestPlan.basePrice;
    }

    // Add overage charges for Business plan
    if (bestPlan === plans[1]) {
      const adSpaceOverage = Math.max(0, adSpaces - bestPlan.adSpaceLimit) * 0.5;
      const campaignOverage = Math.max(0, campaigns - bestPlan.campaignLimit) * 2;
      const storageOverage = Math.max(0, storage - bestPlan.storageLimit) * 0.1;
      totalCost += adSpaceOverage + campaignOverage + storageOverage;
    }

    // Add team member charges
    if (teamMembers > 1) {
      totalCost += (teamMembers - 1) * 5;
    }

    return {
      plan: bestPlan,
      totalCost: Math.round(totalCost * 100) / 100
    };
  };

  useEffect(() => {
    const result = calculatePrice(calculatorValues);
    setCalculatedPrice(result.totalCost);
  }, [calculatorValues]);

  useEffect(() => {
    // Initialize GSAP 3D hover effects
    const cards = cardRefs.current.filter(Boolean);
    
    cards.forEach((card, index) => {
      if (!card) return;

      // Set initial transform
      gsap.set(card, {
        transformPerspective: 1000,
        transformOrigin: "center center"
      });

      // Mouse enter effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.6,
          ease: "power2.out",
          rotationY: 5,
          rotationX: -5,
          scale: 1.05,
          z: 50,
          boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
        });
      });

      // Mouse leave effect
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.6,
          ease: "power2.out",
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          z: 0,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        });
      });

      // Mouse move effect for dynamic rotation
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / (rect.height / 2)) * -10;
        const rotateY = (mouseX / (rect.width / 2)) * 10;

        gsap.to(card, {
          duration: 0.3,
          ease: "power2.out",
          rotationX: rotateX,
          rotationY: rotateY
        });
      });
    });

    // Calculator animations
    if (calculatorRef.current) {
      gsap.fromTo(calculatorRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.5
        }
      );
    }

    // Stagger entrance animation
    gsap.fromTo(cards, 
      {
        opacity: 0,
        y: 50,
        rotationY: -15,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.3
      }
    );

    return () => {
      // Cleanup event listeners
      cards.forEach(card => {
        if (card) {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
          card.removeEventListener('mousemove', () => {});
        }
      });
    };
  }, []);

  const handleSliderChange = (key: keyof typeof calculatorValues, value: number) => {
    setCalculatorValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen relative p-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      ></div>
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            💳 Pricing Plans
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Choose the perfect plan for your advertising needs
          </p>
          
          {/* Calculator Toggle Button */}
          <Button
            onClick={() => setShowCalculator(!showCalculator)}
            className="bg-gradient-to-r from-[#8f4aff] to-[#f5bfa0] text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            {showCalculator ? 'Hide' : 'Show'} Pricing Calculator
          </Button>
        </div>

        {/* Interactive Calculator */}
        {showCalculator && (
          <div ref={calculatorRef} className="mb-16 bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Custom Pricing Calculator</h2>
              <p className="text-white/70">Adjust your usage to see real-time pricing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Ad Spaces
                    </label>
                    <span className="text-[#f5bfa0] font-bold">{calculatorValues.adSpaces}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={calculatorValues.adSpaces}
                    onChange={(e) => handleSliderChange('adSpaces', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Campaigns
                    </label>
                    <span className="text-[#f5bfa0] font-bold">{calculatorValues.campaigns}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={calculatorValues.campaigns}
                    onChange={(e) => handleSliderChange('campaigns', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Team Members
                    </label>
                    <span className="text-[#f5bfa0] font-bold">{calculatorValues.teamMembers}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={calculatorValues.teamMembers}
                    onChange={(e) => handleSliderChange('teamMembers', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium flex items-center">
                      <Calculator className="w-4 h-4 mr-2" />
                      Storage (GB)
                    </label>
                    <span className="text-[#f5bfa0] font-bold">{calculatorValues.storage}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    value={calculatorValues.storage}
                    onChange={(e) => handleSliderChange('storage', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-[#8f4aff]/20 to-[#f5bfa0]/20 rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Estimated Monthly Cost</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#f5bfa0] mb-2">
                    ${calculatedPrice}
                  </div>
                  <p className="text-white/70 text-sm">per month</p>
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Base Plan:</span>
                    <span className="text-white">${calculatePrice(calculatorValues).plan.basePrice}</span>
                  </div>
                  {calculatorValues.teamMembers > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Additional Team:</span>
                      <span className="text-white">+${(calculatorValues.teamMembers - 1) * 5}</span>
                    </div>
                  )}
                  {calculatePrice(calculatorValues).totalCost > calculatePrice(calculatorValues).plan.basePrice && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Overage Charges:</span>
                      <span className="text-white">+${(calculatePrice(calculatorValues).totalCost - calculatePrice(calculatorValues).plan.basePrice).toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-[#8f4aff] to-[#f5bfa0] text-white hover:scale-105 transition-all duration-300">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}

        <div ref={pricingCardsRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`relative rounded-2xl p-8 backdrop-blur-xl cursor-pointer transition-all duration-300 ${
                plan.isPopular
                  ? 'bg-white/10 border border-[#8f4aff]/40 shadow-2xl shadow-[#8f4aff]/30 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none'
                  : 'bg-white/5 border border-white/20 shadow-xl shadow-black/20 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#f5bfa0] to-[#8f4aff] text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/50 ml-2">
                    {plan.period}
                  </span>
                </div>
                <p className="text-white/60 text-sm">
                  {plan.description}
                </p>
              </div>

              <Button 
                variant={plan.isPopular ? "glow" : "default"} 
                size="lg" 
                className={`w-full mb-8 ${plan.isPopular ? "" : "bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20"}`}
              >
                {plan.buttonText}
              </Button>

              <div className="space-y-4">
                <h4 className="text-white font-medium text-sm uppercase tracking-wider">
                  FEATURES
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8f4aff, #f5bfa0);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(143, 74, 255, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8f4aff, #f5bfa0);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(143, 74, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Pricing;