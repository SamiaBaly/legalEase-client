'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Spinner } from '@heroui/react';
import { useSession, signOut } from '@/lib/auth-client'; // useSession ইম্পোর্ট করা হয়েছে
import { toast } from 'react-hot-toast';
import {
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaHistory,
  FaUserEdit,
  FaComments,
  FaChartLine,
  FaCreditCard,
  FaUsers,
} from 'react-icons/fa';

export default function DashboardSidebar({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Better Auth থেকে কারেন্ট ইউজারের সেশন ডেটা নেওয়া হচ্ছে
  const { data: session, isPending } = useSession();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ১. ক্লায়েন্ট রোলের জন্য মেনু আইটেম
  const clientMenuItems = [
    {
      name: 'Profile / Overview',
      href: '/dashboard',
      icon: <FaUser size={18} />,
    },
    {
      name: 'Hiring History',
      href: '/dashboard/client/hiring-history',
      icon: <FaHistory size={18} />,
    },
    {
      name: 'Update Profile',
      href: '/dashboard/client/update-profile',
      icon: <FaUserEdit size={18} />,
    },
    {
      name: 'My Comments',
      href: '/dashboard/client/comments',
      icon: <FaComments size={18} />,
    },
  ];

  // ২. লয়ার রোলের জন্য মেনু আইটেম
  const lawyerMenuItems = [
    {
      name: 'Profile / Overview',
      href: '/dashboard',
      icon: <FaUser size={18} />,
    },
    {
      name: 'Client Requests',
      href: '/dashboard/lawyer/hiring-history',
      icon: <FaHistory size={18} />,
    },
    {
      name: 'Legal Profile',
      href: '/dashboard/lawyer/manage-legal-profile',
      icon: <FaUserEdit size={18} />,
    },
  ];

  const adminMenuItems = [
    {
      name: 'Profile / Overview',
      href: '/dashboard',
      icon: <FaUser size={18} />,
    },
    {
      name: 'Manage Users',
      href: '/dashboard/admin/manage-users',
      icon: <FaUsers size={18} />,
    },
    {
      name: 'All Transactions',
      href: '/dashboard/admin/all-transactions',
      icon: <FaCreditCard size={18} />,
    },
    {
      name: 'Analytics',
      href: '/dashboard/admin/analytics',
      icon: <FaChartLine size={18} />,
    },
  ];

  
  const userRole = session?.user?.role || 'client';
  const menuItems =
    userRole === 'admin'
      ? adminMenuItems
      : userRole === 'lawyer'
        ? lawyerMenuItems
        : clientMenuItems;

  const handleLogout = async () => {
    try {
      await signOut({ callbackURL: '/auth/signin' });
      toast.success('Logged out successfully.');
    } catch (error) {
      toast.error('Failed to log out.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-default-900 dark:text-zinc-100 flex transition-colors duration-200">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR ASIDE */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-content1 dark:bg-zinc-900 border-r border-default-200 dark:border-zinc-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div>
          {/* BRANDING */}
          <div className="bg-[#1e2d4a] dark:bg-zinc-950 h-16 flex items-center justify-between px-6 border-b dark:border-zinc-800">
            <Link
              href="/dashboard"
              className="text-white font-black text-lg tracking-wider uppercase"
            >
              Legal
              <span className="text-[#cda863] dark:text-[#20B2AA]">Desk</span>
            </Link>
            <button onClick={toggleSidebar} className="text-white lg:hidden">
              <FaTimes size={20} />
            </button>
          </div>

          {/* DYNAMIC MENU LINKS */}
          <nav className="p-4 flex flex-col gap-1.5 mt-4">
            {isPending ? (
              <div className="flex justify-center py-4">
                <Spinner size="sm" color="current" className="text-[#cda863]" />
              </div>
            ) : (
              menuItems.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${isActive ? 'bg-[#fbf8f2] text-[#cda863] border-l-4 border-[#cda863] dark:bg-[#cda863]/10 dark:text-[#d4af37] dark:border-[#d4af37]' : 'text-default-500 dark:text-zinc-400 hover:bg-[#eeeae1]/40 dark:hover:bg-zinc-800/40 hover:text-default-900 dark:hover:text-zinc-100'}`}
                  >
                    <span
                      className={
                        isActive
                          ? 'text-[#cda863] dark:text-[#d4af37]'
                          : 'text-default-400 dark:text-zinc-500'
                      }
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })
            )}
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-default-200 dark:border-zinc-800">
          <Button
            fullWidth
            onClick={handleLogout}
            startContent={<FaSignOutAlt size={16} />}
            className="bg-danger-50 hover:bg-danger-100 dark:bg-danger-950/20 dark:hover:bg-danger-950/40 text-danger font-bold h-11 rounded-xl"
          >
            Log Out
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 bg-content1 dark:bg-zinc-900 border-b border-default-200 dark:border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="text-default-600 dark:text-zinc-300 lg:hidden p-1"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-base font-black tracking-wide text-default-800 dark:text-zinc-200 uppercase">
              Dashboard{' '}
              <span className="text-xs font-bold opacity-60">({userRole})</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-default-500 hover:text-default-800 dark:text-zinc-400 dark:hover:text-zinc-200 p-2 rounded-full hover:bg-default-100 dark:hover:bg-zinc-800">
              <FaBell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#eeeae1] dark:bg-zinc-800 border border-default-300 dark:border-zinc-700 flex items-center justify-center font-bold text-xs uppercase text-default-700 dark:text-zinc-300">
              {session?.user?.name ? session.user.name[0] : 'U'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-[#eeeae1]/20 dark:bg-zinc-950/20">
          {children}
        </main>
      </div>
    </div>
  );
}
