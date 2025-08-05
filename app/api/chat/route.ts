import { NextRequest, NextResponse } from 'next/server';

const chatbotPrompt = `
You are AdBot, an AI assistant for AdBrand. Your job is to assist users by answering their queries using the provided FAQ knowledge base. If a question isn't covered in the FAQ, offer a general response or suggest contacting support. Maintain a helpful and friendly tone.

Context about ADmyBRAND:
- We offer three pricing plans: Basic ($10/month), Business ($20/month), Enterprise ($40/month)
- Features include: Hyperlocal Ad Discovery, End-to-End Marketing Management, Real-Time Analytics, One Universal Login, ADify Mobile App, AI-Driven Filters, Automated Quotation & Invoicing, White Label Platform, Unified Vendor Management
- Support options: 24/7 Help Desk, Customer Care, Dedicated Support for Enterprise
- Platform sections: Home, Features, Pricing, Testimonials, Blog, FAQ

FAQ Knowledge Base:
Q: What are your pricing plans?
A: We offer three main pricing plans: Basic ($10/month) for individual advertisers, Business ($20/month) for growing agencies, and Enterprise ($40/month) for unlimited access with dedicated support.

Q: What features do you offer?
A: Our platform includes Hyperlocal Ad Discovery, End-to-End Marketing Management, Real-Time Analytics, One Universal Login, ADify Mobile App, AI-Driven Filters, Automated Quotation & Invoicing, White Label Platform, and Unified Vendor Management.

Q: How do I get started?
A: Getting started is easy! Click the 'Get Started' button on our homepage, choose your pricing plan, create your account, and start exploring our platform features.

Q: What support options are available?
A: We provide 24/7 Help Desk for technical issues, Customer Care for account management, and Dedicated Support for Enterprise customers with guaranteed response times.

Q: Can I see customer testimonials?
A: Yes! We have testimonials from satisfied customers including marketing heads, digital agencies, and local ad sellers who love our platform's ease of use and comprehensive features.

Q: Do you have a blog or resources?
A: Yes, we regularly publish helpful content on our blog covering campaign optimization, industry insights, platform guides, success stories, and performance tips.

User question: `;

// Simple in-memory rate limiter
let requestCount = 0;
let lastResetTime = Date.now();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 10;

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  
  // Check rate limit
  const now = Date.now();
  if (now - lastResetTime > RATE_LIMIT_WINDOW) {
    requestCount = 0;
    lastResetTime = now;
  }
  
  // If we're approaching rate limit, use fallback immediately
  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    console.log('Rate limit approaching, using fallback response');
    const fallbackResponse = await simulateGeminiResponse(message);
    return NextResponse.json({ 
      response: fallbackResponse,
      note: "Using enhanced response due to high demand. Please try again in a few minutes for AI-powered responses."
    });
  }
  
  try {
    requestCount++;
    
    const fullPrompt = chatbotPrompt + message + `\n\nPlease provide a helpful, accurate response about ADmyBRAND. Keep responses concise but informative. If the user asks about navigation, suggest using our quick action buttons.`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': 'AIzaSyDdAexCdkUWXqzEHvUN5JdC3sQMgaaaNkM'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Check if it's a rate limit error
    if (error.message?.includes('429') || error.status === 429) {
      console.log('Rate limit exceeded, using fallback response');
      const fallbackResponse = await simulateGeminiResponse(message);
      return NextResponse.json({ 
        response: fallbackResponse,
        note: "Using enhanced response due to high demand. Please try again in a few minutes for AI-powered responses."
      });
    }
    
    // For other errors, use fallback
    const fallbackResponse = await simulateGeminiResponse(message);
    return NextResponse.json({ response: fallbackResponse });
  }
}

async function simulateGeminiResponse(message: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lowerMessage = message.toLowerCase();
  
  // Predefined responses based on common questions
  if (lowerMessage.includes('what is admybrand') || lowerMessage.includes('what is admy brand') || lowerMessage.includes('admybrand') || lowerMessage.includes('admy brand')) {
    return "**What is ADmyBRAND?**\n\nADmyBRAND is a comprehensive SaaS platform that revolutionizes omnichannel advertising. We're your all-in-one solution for discovering, booking, and managing advertising campaigns across multiple channels.\n\n**Our Mission:**\nWe simplify the complex world of advertising by connecting advertisers with the perfect ad spaces through our intelligent discovery system.\n\n**What We Do:**\n• **Hyperlocal Ad Discovery** - Find the perfect ad spaces for your target audience\n• **End-to-End Campaign Management** - From creation to completion\n• **Real-Time Analytics** - Track performance with live insights\n• **Unified Platform** - One login for all your advertising needs\n\n**Who We Serve:**\n• Individual advertisers looking for targeted placements\n• Growing agencies needing scalable solutions\n• Enterprise clients requiring dedicated support\n\nThink of us as your advertising command center - we make finding and managing ad spaces as easy as ordering food online! 🚀";
  }
  
  if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    return "We offer three main pricing plans:\n\n• Basic Plan: $10/month - Perfect for individual advertisers with up to 10 ad listings\n• Business Plan: $20/month - Ideal for growing agencies with up to 100 listings and white-label access\n• Enterprise Plan: $40/month - Unlimited access with dedicated support and API integration\n\nYou can use our interactive pricing calculator to get a custom quote based on your specific needs!";
  }
  
  if (lowerMessage.includes('feature') || lowerMessage.includes('what can') || lowerMessage.includes('capabilities')) {
    return "ADmyBRAND offers powerful features including:\n\n• Hyperlocal Ad Discovery - Find the perfect ad spaces for your target audience\n• End-to-End Marketing Management - Manage campaigns from creation to completion\n• Real-Time Analytics - Track performance with live insights\n• One Universal Login - Access all tools with single sign-on\n• ADify Mobile App - Manage campaigns on the go\n• AI-Driven Filters - Smart recommendations for optimal placement\n• Automated Quotation & Invoicing - Streamlined billing process\n• White Label Platform - Brand the platform as your own\n• Unified Vendor Management - Manage all vendors in one place\n\nWould you like me to navigate you to the features section?";
  }
  
  if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
    return "We provide comprehensive support:\n\n• 24/7 Help Desk for technical issues and troubleshooting\n• Customer Care for account management and billing inquiries\n• Dedicated Support for Enterprise customers with guaranteed response times\n• Multiple contact options: email, chat, and phone support\n\nYou can also check our FAQ section for quick answers to common questions!";
  }
  
  if (lowerMessage.includes('how to') || lowerMessage.includes('get started') || lowerMessage.includes('sign up')) {
    return "Getting started with ADmyBRAND is easy!\n\n1. Click the 'Get Started' button on our homepage\n2. Choose your pricing plan based on your needs\n3. Create your account and complete setup\n4. Start exploring our platform and features\n\nWould you like me to show you the pricing section to help you choose the right plan?";
  }
  
  if (lowerMessage.includes('faq') || lowerMessage.includes('question')) {
    return "I can help you with common questions about:\n\n• Pricing and plans - Compare our three tiers\n• Features and capabilities - Learn about our tools\n• Getting started - Step-by-step setup guide\n• Support options - Available help channels\n• Platform usage - How to use our features\n\nJust ask me anything specific, or use the quick action buttons to navigate directly to different sections!";
  }

  if (lowerMessage.includes('testimonial') || lowerMessage.includes('review') || lowerMessage.includes('customer')) {
    return "Our customers love ADmyBRAND! Here's what they say:\n\n• \"ADmyBRAND transformed how we plan and manage campaigns. All in one place!\" - Marketing Head, FMCG Brand\n• \"Booking ad space was never this easy. The filters and analytics are super helpful.\" - Digital Marketing Agency\n• \"We use the white label portal to manage our unsold inventory and it's been a game-changer.\" - Local Ad Seller\n\nWould you like me to show you the testimonials section?";
  }

  if (lowerMessage.includes('blog') || lowerMessage.includes('article') || lowerMessage.includes('content')) {
    return "We regularly publish helpful content on our blog covering:\n\n• Campaign optimization strategies\n• Industry insights and trends\n• Platform feature guides\n• Success stories and case studies\n• Tips for better ad performance\n\nWould you like me to navigate you to our blog section?";
  }

  // Default response for other questions
  return "Hi! I'm AdBot, your ADmyBRAND assistant. I'm here to help you learn about our comprehensive advertising platform.\n\n**What is ADmyBRAND?**\nADmyBRAND is an all-in-one SaaS platform that simplifies omnichannel advertising. We connect advertisers with the perfect ad spaces through our intelligent discovery system.\n\n**What can I help you with?**\n• **Pricing Plans** - Compare our Basic ($10), Business ($20), and Enterprise ($40) plans\n• **Features** - Learn about our 9 powerful tools including Hyperlocal Discovery and Real-Time Analytics\n• **Getting Started** - Step-by-step guide to set up your account\n• **Support** - 24/7 help desk and dedicated customer care\n• **Success Stories** - See how other businesses are thriving with ADmyBRAND\n\nFeel free to ask me anything specific, or use the quick action buttons below to navigate directly to different sections!";
} 