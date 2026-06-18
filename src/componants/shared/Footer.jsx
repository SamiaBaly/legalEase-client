'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Input } from '@heroui/react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPaperPlane,
} from 'react-icons/fa';

const Footer = () => {
  const logo = '/asset/logo.png';
  const currentYear = new Date().getFullYear();

  // Prevent dynamic form submission refreshing the screen
  const handleNewsletterSubmit = e => {
    e.preventDefault();
  };

  return (
    // Changed main wrapper to deep teal color and white text contrast
    <footer className="bg-[#005A5B] text-white/90 border-t border-white/10">
      {/* TOP REGION: NAVIGATION LINKS & NEWSLETTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* COL 1: LOGO & BRAND DESCRIPTION */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <Link href="/" className="inline-block relative w-40 h-12">
            <Image
              src={logo}
              alt="LegalEase Logo"
              fill
              className="object-contain object-left brightness-0 invert" // Inverted logo to stand out nicely on dark teal
            />
          </Link>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">
            Connecting citizens with premier legal representatives globally.
            Streamlining legal advice through structured security metrics.
          </p>
        </div>

        {/* COL 2: QUICK LINKS */}
        <div className="md:col-span-3 flex flex-col gap-4 text-left">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium">
            <li>
              <Link
                href="/about"
                className="hover:text-[#98FF98] transition-colors duration-200 text-white/80"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#98FF98] transition-colors duration-200 text-white/80"
              >
                Contact Support
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-[#98FF98] transition-colors duration-200 text-white/80"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-[#98FF98] transition-colors duration-200 text-white/80"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* COL 3: NEWSLETTER SIGNUP (Frontend Only) */}
        <div className="md:col-span-5 flex flex-col gap-4 text-left">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">
            Keep Updated
          </h4>
          <p className="text-sm text-white/70">
            Subscribe to our newsletters to receive corporate law case briefs
            and platform insights.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex gap-2 w-full max-w-md"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              variant="bordered"
              className="w-full text-white border-white/20 hover:border-white/40 focus-within:!border-[#98FF98] text-white"
            />
            <Button
              type="submit"
              radius="lg"
              size="md"
              isIconOnly
              className="bg-white text-[#005A5B] hover:bg-[#98FF98] shrink-0 font-bold shadow-xs transition-colors duration-200"
            >
              <FaPaperPlane size={14} />
            </Button>
          </form>
        </div>
      </div>

      {/* BOTTOM REGION: COPYRIGHTS & SOCIAL ICONS */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright text */}
          <p className="text-xs text-white/60 font-medium order-2 sm:order-1 text-center sm:text-left">
            &copy; {currentYear} LegalEase. All rights reserved. Built with
            structural integrity.
          </p>

          {/* Social Icons Array (Dummy Links) */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            {[
              { icon: <FaFacebookF size={13} />, url: '#' },
              { icon: <FaTwitter size={13} />, url: '#' },
              { icon: <FaLinkedinIn size={13} />, url: '#' },
              { icon: <FaInstagram size={13} />, url: '#' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#005A5B] hover:bg-white hover:border-white transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
