'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@heroui/react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { ThemeSwitch } from '../ThemeSwitch';
import { signOut, useSession } from '@/lib/auth-client';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // কারেন্ট ইউজারের রোল (সেশন থেকে নেওয়া হচ্ছে, ডিফল্ট 'client')
  const currentUserRole = user?.role || 'client';

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Lawyers', href: '/lawyers' },
  ];

  const dashboardLinks = {
    client: [
      { label: 'My Appointments', href: '/dashboard/client/appointments' },
      { label: 'Consultation History', href: '/dashboard/client/history' },
      { label: 'Profile Settings', href: '/dashboard/client/settings' },
    ],
    lawyer: [
      { label: 'Case Schedule', href: '/dashboard/lawyer/schedule' },
      { label: 'Analytics', href: '/dashboard/lawyer/analytics' },
      { label: 'Profile Settings', href: '/dashboard/lawyer/settings' },
    ],
    admin: [
      { label: 'User Management', href: '/dashboard/admin/users' },
      { label: 'Verifications', href: '/dashboard/admin/verifications' },
    ],
  };

  // ড্যাশবোর্ডের href রুট ঠিক করা হয়েছে যাতে অবজেক্ট পাস না হয়ে সঠিক পাথ পায়
  if (user?.email) {
    navLinks.push({
      label: 'Dashboard',
      href: '/dashboard',
    });
  }

  const isActive = href => pathname === href;
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-default-200 bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-default-600"
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

        {/* CENTER */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium ${
                  isActive(link.href)
                    ? 'text-[#005A5B]'
                    : 'text-default-600 hover:text-[#005A5B]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden sm:block">
            <Input className="w-64" placeholder="Search lawyers..." />
          </div>

          {/* Theme */}
          <ThemeSwitch />

          {/* AUTH */}
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar src={user?.image} name="User" className="w-9 h-9" />

              <p className="text-sm font-medium">Hi, {user?.name}</p>

              <Button size="sm" color="danger" onClick={handleLogout}>
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

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-default-200 bg-background">
          <div className="p-4 space-y-3">
            <Input className="w-64" placeholder="Search lawyers..." />

            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <>
                <div className="border-t my-2 border-default-200" />
                <p className="text-xs font-black uppercase tracking-wider text-default-400 mb-1">
                  Dashboard Links ({currentUserRole})
                </p>

                {dashboardLinks[currentUserRole]?.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-1.5 text-sm font-semibold text-default-600 hover:text-[#005A5B]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <Button
                  className="w-full mt-4"
                  color="danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
