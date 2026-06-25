'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { ThemeSwitch } from '../ThemeSwitch';
import { signOut, useSession } from '@/lib/auth-client';
import { BsList } from 'react-icons/bs';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const navLinks = useMemo(() => {
    const links = [
      { label: 'Home', href: '/'},
      { label: 'Browse Lawyers', href: '/lawyers', },
    ];
    if (user?.email) {
      const dashboardLinks = { client: '/dashboard/client', lawyer: '/dashboard/lawyer', admin: '/dashboard/admin' };
      const role = user?.role || 'client';
      links.push({ label: 'Dashboard', href: dashboardLinks[role] || dashboardLinks.client});
    }
    return links;
  }, [user]);

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <header className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 relative">

        {/* বামপাশে হামবার্গার এবং ডানপাশে থিম সুইচ (লেআউট ব্যালেন্স করার জন্য) */}
        <div className="flex md:hidden flex-1">
          <button className="p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <BsList className="text-2xl" />
          </button>
        </div>

        {/* লোগো সেকশন (মোবাইলে মাঝখানে, ডেস্কটপে বামে) */}
        <div className={`flex items-center ${isMenuOpen ? 'hidden md:flex' : ''}`}>
          <Link href="/">
            <Image src="/asset/logo.png" alt="logo" width={140} height={44} priority />
          </Link>
        </div>

        {/* নেভিগেশন লিংকস (মাঝখানে - শুধু ডেস্কটপ) */}
        <ul className="hidden md:flex flex-1 justify-center items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition ${isActive(link.href) ? 'bg-white/10 px-4 py-2 rounded-full text-white' : 'text-zinc-300 hover:text-white'
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ডানদিকের সেকশন */}
        <div className="flex items-center gap-4 ml-auto">
          <ThemeSwitch />
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <span className="text-sm font-medium text-white">{user.name}</span>
            ) : (
              <Link href="/auth/signin" className="text-sm text-zinc-300 hover:text-white">Sign In</Link>
            )}
            <Button size="sm" className="bg-[#005A5B] text-white" onClick={() => user ? signOut() : window.location.href = '/auth/signup'}>
              {user ? 'Logout' : 'Sign Up'}
            </Button>
          </div>
        </div>
      </header>

      {/* মোবাইল মেনু (এখানে লোগো সরিয়ে দেওয়া হয়েছে) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#050816] p-6 flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-zinc-300 hover:text-white text-lg">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}