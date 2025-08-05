import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { 
  Search, 
  Settings, 
  BarChart3, 
  Link, 
  Smartphone, 
  Brain, 
  FileText, 
  Tag, 
  Wrench 
} from "lucide-react";

export const HoverEffect = ({
  items,
  className,
}: {
  items?: {
    title: string;
    description: string;
    link: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Default items if none provided
  const defaultItems = [
    {
      title: "Hyperlocal Ad Discovery",
      description: "Explore ads in city centers, metro stations, buses, religious centers, etc.",
      link: "#hyperlocal",
      icon: Search
    },
    {
      title: "End-to-End Marketing",
      description: "Plan, book, execute & analyze campaigns from one portal.",
      link: "#marketing",
      icon: Settings
    },
    {
      title: "Real-Time Analytics",
      description: "Live tracking, heatmaps, and performance reports.",
      link: "#analytics",
      icon: BarChart3
    },
    {
      title: "One Universal Login",
      description: "Single-Sign-On for all marketing tools and services.",
      link: "#login",
      icon: Link
    },
    {
      title: "ADify App",
      description: "Manage campaigns on the go via the mobile app.",
      link: "#app",
      icon: Smartphone
    },
    {
      title: "AI-Driven Filters",
      description: "Smart filters and algorithms help in choosing the best ad spaces.",
      link: "#ai",
      icon: Brain
    },
    {
      title: "Automated Quotation & Invoicing",
      description: "Instantly generate quotes, manage invoices, and streamline billing—all from your dashboard.",
      link: "#quotation",
      icon: FileText
    },
    {
      title: "White Label Platform",
      description: "Offer clients a fully branded experience with our customizable white-label solutions.",
      link: "#whitelabel",
      icon: Tag
    },
    {
      title: "Unified Vendor Management",
      description: "Seamlessly onboard, track, and collaborate with vendors across various ad formats and regions.",
      link: "#vendor",
      icon: Wrench
    }
  ];

  const itemsToUse = items || defaultItems;

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {itemsToUse.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <a
            href={item?.link}
            key={item?.link}
            className="relative group block p-2 h-full w-full transform transition-all duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full block rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #f5bfa0 0%, #8f4aff 50%, #f5bfa0 100%)',
                    filter: 'blur(8px)',
                    opacity: 0.6
                  }}
                  layoutId="hoverBackground"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 0.6,
                    scale: 1,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2, delay: 0.1 },
                  }}
                />
              )}
            </AnimatePresence>
            
            {/* Glow effect on hover */}
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #f5bfa0 0%, #8f4aff 100%)',
                    filter: 'blur(20px)',
                    opacity: 0.3
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 0.3,
                    transition: { duration: 0.3 }
                  }}
                  exit={{ 
                    opacity: 0,
                    transition: { duration: 0.2 }
                  }}
                />
              )}
            </AnimatePresence>

            <Card>
              <div className="flex items-center gap-3 mb-3">
                {IconComponent && <IconComponent className="h-6 w-6 text-purple-400" />}
                <CardTitle>{item.title}</CardTitle>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </a>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black relative z-20 transition-all duration-300 group-hover:shadow-2xl",
        className
      )}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Subtle inner glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, #f5bfa0 0%, #8f4aff 100%)',
          filter: 'blur(40px)'
        }}
      />
      
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 
      className={cn("font-bold tracking-wide mt-4 transition-all duration-300 group-hover:drop-shadow-lg", className)}
      style={{ 
        color: '#ffffff',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
      }}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 tracking-wide leading-relaxed text-sm transition-all duration-300 group-hover:drop-shadow-md",
        className
      )}
      style={{ 
        color: 'rgba(255, 255, 255, 0.7)',
        textShadow: '0 0 5px rgba(255, 255, 255, 0.05)'
      }}
    >
      {children}
    </p>
  );
};