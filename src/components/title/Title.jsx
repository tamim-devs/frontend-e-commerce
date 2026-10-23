"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const Title = ({
  heading,
  Badge,
  description,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  showSecondaryButton,
  showTrustPoints,
}) => {
  return (
    <section className="relative isolate overflow-hidden bg-[#fffaf0] px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 xl:py-28">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 -top-20 -z-10 h-48 w-48 rounded-full bg-[#e5ae2f]/15 blur-3xl sm:h-64 sm:w-64 lg:h-72 lg:w-72" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 -z-10 h-56 w-56 rounded-full bg-[#47734e]/15 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto w-full max-w-4xl text-center"
      >
        {/* Badge */}
        {Badge && (
          <div className="mb-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#e5ae2f]/40 bg-white/80 px-3 py-2 shadow-sm sm:mb-6 sm:px-4">
            <Sparkles
              size={16}
              className="shrink-0 text-[#c18a12]"
            />

            <span className="break-words text-[10px] font-bold uppercase leading-5 tracking-[1.5px] text-[#244b35] sm:text-xs sm:tracking-[2px] md:text-sm">
              {Badge}
            </span>
          </div>
        )}

        {/* Heading */}
        <h1 className="break-words text-3xl font-extrabold leading-[1.2] tracking-tight text-[#30230e] [overflow-wrap:anywhere] sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl xl:text-7xl">
          {heading}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-2xl break-words text-sm leading-6 text-[#716957] sm:mt-5 sm:text-base sm:leading-7 md:mt-6 md:text-lg md:leading-8">
          {description}
        </p>

        {/* Trust Points */}
        {showTrustPoints && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 border-t border-[#e8dfcc] pt-6 sm:mt-10 sm:gap-x-7 sm:pt-7 md:mt-12">
            <div className="flex items-center gap-2 text-xs font-medium text-[#52634e] sm:text-sm">
              <Leaf
                size={18}
                className="shrink-0 text-[#47734e]"
              />
              <span>Naturally Sourced</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#52634e] sm:text-sm">
              <ShieldCheck
                size={18}
                className="shrink-0 text-[#47734e]"
              />
              <span>Quality Assured</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#52634e] sm:text-sm">
              <Sparkles
                size={18}
                className="shrink-0 text-[#c18a12]"
              />
              <span>Fresh &amp; Authentic</span>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Title;