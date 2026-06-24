'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Input, Avatar } from '@heroui/react';
import { ThemeSwitch } from '../ThemeSwitch';
import { signOut, useSession } from '@/lib/auth-client';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;


  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Lawyers', href: '/lawyers' },
  ];

  const dashboardLinks = {
    client: "/dashboard/client",
    lawyer: '/dashboard/lawyer',
    admin:'/dashboard/admin'
  }

 
  if (user?.email) {
    navLinks.push({
      label: 'Dashboard',
      href: dashboardLinks[user?.role || 'client'],
    });
  }

  const isActive = href => pathname === href;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-default-200 bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* LEFT: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-default-600 text-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/asset/logo.png"
              alt="logo"
              width={150}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* CENTER: Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium ${
                  isActive(link.href)
                    ? 'text-[#005A5B] font-bold'
                    : 'text-default-600 hover:text-[#005A5B]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT: Search, Theme, Auth Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Input className="w-64" placeholder="Search lawyers..." />
          </div>

          <ThemeSwitch />

          {user ? (
            <div className="flex items-center gap-3">
              <Avatar
                src={user?.image}
                name={user?.name || 'User'}
                className="w-9 h-9"
              />
              <p className="text-sm font-medium hidden sm:block">
                Hi, {user?.name}
              </p>
              <Button
                size="sm"
                color="danger"
                variant="flat"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/signin" className="text-sm text-default-600">
                Sign In
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-[#005A5B] text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE MENU: মোবাইলেও শুধু মেইন লিংকগুলো থাকবে */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-default-200 bg-background transition-all">
          <div className="p-4 space-y-3">
            <Input className="w-full" placeholder="Search lawyers..." />
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-base ${isActive(link.href) ? 'text-[#005A5B] font-bold' : 'text-default-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Button
                color="danger"
                variant="flat"
                className="w-full mt-2"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
