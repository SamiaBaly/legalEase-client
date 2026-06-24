'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Avatar } from '@heroui/react';
import { ThemeSwitch } from '../ThemeSwitch';
import { signOut, useSession } from '@/lib/auth-client';
import { BsList } from 'react-icons/bs';
import { FaHome, FaUserTie } from 'react-icons/fa6';

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
    client: '/dashboard/client',
    lawyer: '/dashboard/lawyer',
    admin: '/dashboard/admin',
  };

  const dashboardHref = dashboardLinks[user?.role || 'client'];

  if (user?.email) {
    navLinks.push({
      label: 'Dashboard',
      href: dashboardHref,
    });
  }

  const isActive = (href) => pathname === href;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-xl p-2 text-white/80 transition hover:bg-white/10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <BsList className="text-2xl" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/asset/logo.png"
              alt="logo"
              width={140}
              height={44}
              priority
            />
          </Link>
        </div>

        <ul className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            if (link.label === 'Dashboard') {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      'inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all',
                      active
                        ? 'bg-white/10 text-white shadow-md ring-1 ring-white/10'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white',
                    ].join(' ')}
                  >
                    <FaUserTie className="text-sm" />
                    <span className="hidden lg:inline">Dashboard</span>
                  </Link>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[
                    'rounded-2xl px-4 py-2 text-sm font-medium transition-all',
                    active
                      ? 'bg-white/10 text-white shadow-md ring-1 ring-white/10'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeSwitch />

          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar
                src={user?.image}
                name={user?.name || 'User'}
                className="h-9 w-9 ring-1 ring-white/10"
              />

              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">
                  Hi, {user?.name || 'User'}
                </p>
                <p className="text-xs text-zinc-400">
                  {user?.role || 'client'}
                </p>
              </div>

              <Button
                size="sm"
                color="danger"
                variant="flat"
                onClick={handleLogout}
                className="hidden sm:inline-flex"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/auth/signin"
                className="hidden text-sm text-zinc-300 transition hover:text-white sm:inline"
              >
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

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#050816] md:hidden">
          <div className="space-y-2 px-4 py-4">
            {navLinks.map((link) => {
              if (link.label === 'Dashboard') return null;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all',
                    isActive(link.href)
                      ? 'bg-white/10 text-white shadow-md ring-1 ring-white/10'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white',
                  ].join(' ')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label === 'Home' ? (
                    <FaHome className="text-base" />
                  ) : null}
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {user && (
              <Button
                color="danger"
                variant="flat"
                className="mt-2 w-full"
                onClick={async () => {
                  await handleLogout();
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