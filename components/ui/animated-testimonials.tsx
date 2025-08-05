"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const testimonialsData: Testimonial[] = [
  {
    quote: "ADmyBRAND transformed how we plan and manage campaigns. All in one place!",
    name: "Marketing Head",
    designation: "FMCG Brand",
    src: "/test1.jpg"
  },
  {
    quote: "Booking ad space was never this easy. The filters and analytics are super helpful.",
    name: "Digital Marketing Agency",
    designation: "Agency",
    src: "/test2.jpg"
  },
  {
    quote: "We use the white label portal to manage our unsold inventory and it's been a game-changer.",
    name: "Local Ad Seller",
    designation: "Ad Seller",
    src: "/test3.jpg"
  },
  {
    quote: "ADify App lets me run and track campaigns on the go — it's like having an ad agency in my pocket.",
    name: "Startup Founder",
    designation: "Entrepreneur",
    src: "/test4.jpg"
  },
  {
    quote: "We saved hours every week by switching to ADmyBRAND. Centralized tools and real-time insights make it seamless.",
    name: "Media Buying Executive",
    designation: "Media Executive",
    src: "/test5.jpg"
  }
];

export const AnimatedTestimonials = ({
  testimonials = testimonialsData,
  autoplay = false,
}: {
  testimonials?: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16 font-sans antialiased md:max-w-4xl lg:max-w-5xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-12 lg:gap-16 md:grid-cols-2">
        {/* Image Section - Reduced sizing */}
        <div>
          <div className="relative h-64 w-full md:h-80 lg:h-96">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.src}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -60, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-lg"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Section - Reduced typography and spacing */}
        <div className="flex flex-col justify-between py-4 lg:py-6">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="space-y-3 lg:space-y-4"
          >
            {/* Name and Designation - Reduced text */}
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white leading-tight">
                {testimonials[active].name}
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-500 dark:text-neutral-500 font-medium">
                {testimonials[active].designation}
              </p>
            </div>

            {/* Quote - Reduced size and more readable */}
            <motion.div className="mt-4 lg:mt-6">
              <motion.p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-neutral-300 leading-relaxed font-light">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Navigation Buttons - Reduced size */}
          <div className="flex gap-3 pt-8 md:pt-8 lg:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <IconArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <IconArrowRight className="h-4 w-4 md:h-5 md:w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};