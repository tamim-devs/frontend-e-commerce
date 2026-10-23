
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative flex min-h-[620px] items-center justify-center overflow-hidden bg-[#f8f5e9] px-4 py-16 sm:min-h-[650px] sm:px-6 sm:py-20 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5ae2f]/10 blur-3xl sm:h-[450px] sm:w-[450px] lg:h-[600px] lg:w-[600px]" />

        <div className="absolute -left-32 -top-24 h-64 w-64 rounded-full bg-[#e5ae2f]/10 blur-3xl sm:-left-40 sm:-top-32 sm:h-96 sm:w-96" />

        <div className="absolute -bottom-32 -right-28 h-72 w-72 rounded-full bg-[#5b9d87]/10 blur-3xl sm:-bottom-40 sm:-right-32 sm:h-96 sm:w-96" />

        <div className="absolute left-[8%] top-[18%] h-1.5 w-1.5 rounded-full bg-[#d99a00]/50 sm:h-2 sm:w-2" />

        <div className="absolute right-[8%] top-[25%] h-2 w-2 rounded-full bg-[#4f927c]/40 sm:h-3 sm:w-3" />

        <div className="absolute bottom-[16%] left-[12%] h-2 w-2 rounded-full bg-[#e5ae2f]/40 sm:left-[18%] sm:h-3 sm:w-3" />

        <div className="absolute bottom-[20%] right-[14%] h-1.5 w-1.5 rounded-full bg-[#4f927c]/40 sm:right-[20%] sm:h-2 sm:w-2" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-[#d9c98e] bg-white/70 px-3.5 py-2 text-xs font-semibold text-[#526b5d] shadow-sm backdrop-blur-sm sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <Sparkles size={14} className="text-[#d99a00] sm:h-4 sm:w-4" />
          Pure • Fresh • Natural
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: "easeOut",
          }}
          className="mx-auto mt-5 max-w-4xl text-[2.7rem] font-black leading-[1.05] tracking-tight text-[#25382d] sm:mt-7 sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Goodness You Can
          <span className="block">
            <span className="bg-gradient-to-r from-[#b77a00] via-[#e0aa2f] to-[#b77a00] bg-clip-text text-transparent">
              Trust
            </span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="mx-auto mt-5 max-w-[340px] text-sm leading-6 text-[#68756c] sm:mt-7 sm:max-w-2xl sm:text-lg sm:leading-8"
        >
          Pure honey, authentic khati cow milk, and fresh
          fishery products — naturally sourced and carefully
          delivered to bring quality and freshness to your
          everyday life.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.45,
            ease: "easeOut",
          }}
          className="mx-auto mt-7 flex w-full max-w-[340px] flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <Link href="/products" className="w-full sm:w-auto">
            <motion.div
              whileHover={{
                y: -3,
                scale: 1.02,
                boxShadow: "0 14px 30px rgba(183,122,0,0.22)",
              }}
              whileTap={{ scale: 0.97 }}
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#c88a0a] px-7 py-3.5 text-sm font-bold text-white sm:w-auto sm:text-base"
            >
              Shop Now

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.div>
          </Link>

          <Link href="/products" className="w-full sm:w-auto">
            <motion.div
              whileHover={{
                y: -3,
                backgroundColor: "#25382d",
                color: "#ffffff",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full cursor-pointer items-center justify-center rounded-full border border-[#527564] bg-transparent px-7 py-3.5 text-sm font-bold text-[#385b4b] transition-colors duration-300 sm:w-auto sm:text-base"
            >
              Explore Products
            </motion.div>
          </Link>
        </motion.div>

        {/* Trust Points */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.65,
            ease: "easeOut",
          }}
          className="mx-auto mt-8 grid max-w-[340px] grid-cols-2 gap-x-3 gap-y-4 sm:mt-10 sm:flex sm:max-w-3xl sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-4"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#59675f] sm:gap-2 sm:text-sm">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d99a00] text-white">
              <Check size={12} />
            </span>
            Pure Honey
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#59675f] sm:gap-2 sm:text-sm">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d99a00] text-white">
              <Check size={12} />
            </span>
            Khati Cow Milk
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#59675f] sm:gap-2 sm:text-sm">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4f927c] text-white">
              <Check size={12} />
            </span>
            Fresh Fish
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#59675f] sm:gap-2 sm:text-sm">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4f927c] text-white">
              <Check size={12} />
            </span>
            Naturally Sourced
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
