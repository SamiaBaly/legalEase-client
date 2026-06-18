'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGavel,
  FaArrowRight,
  FaShieldAlt,
  FaBriefcase,
  FaUserCheck,
} from 'react-icons/fa';

// Import Swiper React components and required styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Hero = () => {
  const slides = [
    '/asset/banner/hero1.jpg',
    '/asset/banner/hero2.jpg',
    '/asset/banner/hero3.jpg',
  ];

  // Professional legal value points with icons
  const features = [
    { icon: <FaShieldAlt />, text: 'Secure Consultations' },
    { icon: <FaBriefcase />, text: 'Top Corporate Lawyers' },
    { icon: <FaUserCheck />, text: 'Verified Profiles' },
  ];

  // Infinite Loop Typewriter words list
  const words = [
    'Corporate Law',
    'Family Defense',
    'Intellectual Property',
    'Tax Planning',
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Typewriter Engine logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500); // Word hold time before delete
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex(prev => (prev + 1) % words.length); // Infinite Loop Logic
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex(prev => prev + (reverse ? -1 : 1));
      },
      reverse ? 40 : 80,
    ); // Typing speed vs Deleting speed

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Orchestration Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 60, damping: 15 },
    },
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] max-h-[750px] bg-background overflow-hidden">
      {/* BACKGROUND CAROUSEL SLIDER */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect={'fade'}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((imageAsset, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10" />
              <Image
                src={imageAsset}
                alt={`LegalEase Banner ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* FOREGROUND CONTENT SECTION */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center items-center text-center text-white"
      >
        {/* Decorative Badge */}
        <motion.div
          variants={textVariants}
          className="flex items-center gap-2 bg-[#98FF98]/10 border border-[#98FF98]/30 px-3 py-1.5 rounded-full text-[#98FF98] text-xs font-semibold tracking-wider uppercase mb-5"
        >
          <FaGavel className="text-sm" />
          <span>Your Trusted Legal Marketplace</span>
        </motion.div>

        {/* Core Tagline Headlines with Dynamic Typewriter Loop */}
        <motion.h1
          variants={textVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.25] mb-5 min-h-[120px] sm:min-h-[auto]"
        >
          Find & Hire Expert Counsel for <br />
          <span className="text-[#98FF98] inline-block relative">
            {words[index].substring(0, subIndex)}
            {/* Blinking Cursor caret */}
            <span className="absolute -right-1 top-0 bottom-0 w-[3px] bg-[#98FF98] animate-pulse" />
          </span>
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-base sm:text-lg md:text-xl text-default-300 max-w-2xl mb-8 font-normal leading-relaxed"
        >
          Connect with top-rated, verified attorneys and legal advisors and
          solve complex cases seamlessly. Simplified case management starts
          here.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          variants={textVariants}
          className="flex justify-center w-full mb-12"
        >
          <Button
            as={motion.a}
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            href="/lawyers"
            size="lg"
            radius="full"
            endContent={<FaArrowRight size={14} />}
            className="bg-[#005A5B] hover:bg-[#004445] text-white font-semibold text-medium shadow-lg shadow-[#005A5B]/30 transition-shadow duration-300 px-10 cursor-pointer"
          >
            Browse Lawyers
          </Button>
        </motion.div>

        {/* Mini Feature Items Footer */}
        <motion.div
          variants={textVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/20 w-full max-w-3xl justify-center"
        >
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03, y: -2 }}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-default-200 justify-center cursor-default group"
            >
              <span className="text-[#98FF98] text-xl bg-white/5 p-2 rounded-lg border border-white/5 transition-colors duration-300 group-hover:bg-[#98FF98]/10 group-hover:border-[#98FF98]/20">
                {item.icon}
              </span>
              <span className="text-sm font-medium tracking-wide transition-colors duration-300 group-hover:text-white">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #98ff98 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
        .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.6;
        }
      `}</style>
    </section>
  );
};

export default Hero;
