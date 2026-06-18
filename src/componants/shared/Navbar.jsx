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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mock Authentication State (Modify to test states)
  const isLoggedIn = true;
  const userRole = 'lawyer'; // Options: 'client', 'lawyer', 'admin'

  // Standard Navigation Links
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Lawyers', href: '/lawyers' },
  ];

  // Role-Based Dashboard Links (Uncommented to prevent ReferenceErrors below)
  const dashboardLinks = {
    client: [
      { label: 'My Appointments', href: '/dashboard/client/appointments' },
      { label: 'Consultation History', href: '/dashboard/client/history' },
      { label: 'Profile Settings', href: '/dashboard/client/settings' },
    ],
    lawyer: [
      { label: 'Case Schedule', href: '/dashboard/lawyer/schedule' },
      { label: 'Earnings & Analytics', href: '/dashboard/lawyer/analytics' },
      { label: 'Profile Settings', href: '/dashboard/lawyer/settings' },
    ],
    admin: [
      { label: 'User Management', href: '/dashboard/admin/users' },
      {
        label: 'Verification Requests',
        href: '/dashboard/admin/verifications',
      },
    ],
  };

  const isActive = href => pathname === href;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-default-200 bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* LEFT SECTION: Hamburger Menu Button & Logo */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-default-600 hover:text-[#005A5B] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-wide"
          >
            <Image
              height={80}
              width={180}
              src="/asset/logo.png"
              alt="logo"
              priority
            />
          </Link>
        </div>

        {/* CENTER SECTION: Desktop Static Links & Role Dropdown */}
        <ul className="hidden items-center gap-6 md:flex list-none m-0 p-0">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#005A5B] font-semibold'
                    : 'text-default-600 hover:text-[#005A5B]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Role Dropdown */}
          {/* {isLoggedIn && (
            <li>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-sm font-medium text-default-600 data-[hover=true]:text-[#005A5B] min-w-0 flex items-center gap-1 cursor-pointer"
                    endContent={<FaChevronDown size={10} />}
                    radius="sm"
                    variant="light"
                  >
                    Dashboard
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dashboard Options" variant="flat">
                  {dashboardLinks[userRole]?.map(subLink => (
                    <DropdownItem
                      key={subLink.href}
                      as={Link}
                      href={subLink.href}
                      className={
                        isActive(subLink.href)
                          ? 'text-[#005A5B] font-semibold'
                          : ''
                      }
                    >
                      {subLink.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </li>
          )} */}
        </ul>

        {/* RIGHT SECTION: Search Bar & User Session Handlers */}
        <div className="flex items-center gap-4">
          {/* Global Search Bar (Hidden on smaller screens) */}
          <div className="hidden sm:block">
            <Input
              aria-label="Name"
              className="w-64"
              placeholder="Sarch lawyer......."
            />
          </div>
          <div>
            <ThemeSwitch/>
          </div>

          {/* {isLoggedIn ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="default"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Profile Interface" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold text-xs text-default-500">
                    Signed in as
                  </p>
                  <p className="font-semibold text-[#005A5B]">
                    user@legalease.com
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-default-600 hover:text-[#005A5B]"
              >
                Login
              </Link>
              <Button
                as={Link}
                href="/signup"
                size="sm"
                radius="full"
                className="bg-[#005A5B] text-white font-medium"
              >
                Sign Up
              </Button>
            </div>
          )} */}
        </div>
      </header>

      {/* MOBILE BREAKDOWN EXPANSION MENU */}
      {isMenuOpen && (
        <div className="border-t border-default-200 bg-background md:hidden">
          <div className="p-4 space-y-4">
            {/* Contextual Search in Mobile Hamburger Menu */}
            <Input
              classNames={{
                base: 'w-full h-10',
                mainWrapper: 'h-full',
                input: 'text-sm',
                inputWrapper:
                  'h-full font-normal text-default-500 bg-default-100',
              }}
              placeholder="Search lawyers..."
              size="sm"
              startContent={<FaSearch size={14} className="text-default-400" />}
              type="search"
            />

            <ul className="flex flex-col gap-1 list-none m-0 p-0">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2 text-base ${
                      isActive(link.href)
                        ? 'text-[#005A5B] font-bold'
                        : 'text-default-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Mobile Extended Dashboard Elements */}
              {isLoggedIn && (
                <>
                  <div className="w-full border-t border-default-100 my-2" />
                  <span className="text-[11px] font-bold text-default-400 uppercase tracking-wider block px-1 mb-1">
                    Dashboard ({userRole})
                  </span>
                  {dashboardLinks[userRole]?.map(subLink => (
                    <li key={subLink.href}>
                      <Link
                        href={subLink.href}
                        className={`block py-1.5 pl-3 text-sm ${
                          isActive(subLink.href)
                            ? 'text-[#005A5B] font-semibold'
                            : 'text-default-600'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subLink.label}
                      </Link>
                    </li>
                  ))}
                  <div className="w-full border-t border-default-100 my-2" />
                  <li>
                    <Link
                      href="/logout"
                      className="block py-2 text-base text-danger font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log Out
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
