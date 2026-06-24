'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Drawer, Chip } from '@heroui/react';
import { BsLayoutSidebar } from 'react-icons/bs';
import { FaHome, FaBriefcase, FaHistory, FaUsers, FaRegUser } from 'react-icons/fa6';

const iconMap = {
  Home: FaHome,
  'Manage-Profile': FaRegUser,
  'Comments-history': FaHistory,
  'Hiring-History': FaHistory,
  Jobs: FaBriefcase,
  Transactions: FaBriefcase,
  Analytics: FaBriefcase,
  'Manage-users': FaUsers,
};

export function DashboardSidebar({ user }) {
  const pathname = usePathname();

  const clientNavLinks = [
    { href: '/dashboard/client', label: 'Home' },
    { href: '/dashboard/client/update-profile', label: 'Manage-Profile' },
    { href: '/dashboard/client/comments', label: 'Comments-history' },
    { href: '/dashboard/client/hiring-history', label: 'Hiring-History' },
  ];

  const lawyerNavLinks = [
    { href: '/dashboard/lawyer', label: 'Home' },
    { href: '/dashboard/lawyer/edit-profile', label: 'Edit Profile' },
    { href: '/dashboard/lawyer/manage-legal-profile', label: 'Manage-Profile' },
    { href: '/dashboard/lawyer/hiring-history', label: 'Hiring-History' },
  ];

  const adminNavLinks = [
    { href: '/dashboard/admin', label: 'Home' },
    { href: '/dashboard/admin/all-transactions', label: 'Transactions' },
    { href: '/dashboard/lawyer/analytics', label: 'Analytics' },
    { href: '/dashboard/admin/manage-users', label: 'Manage-users' },
  ];

  const navLinksMap = {
    client: clientNavLinks,
    lawyer: lawyerNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || 'client'] || clientNavLinks;

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + '/');

  const navContent = (
    <nav className="mt-4 flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = iconMap[item.label] || FaRegUser;
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200',
              active
                ? 'bg-white/10 text-white shadow-md ring-1 ring-white/10'
                : 'text-zinc-300 hover:bg-white/5 hover:text-white',
            ].join(' ')}
          >
            <Icon className={active ? 'text-white' : 'text-zinc-400'} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const sidebarPanel = (
    <div className="flex h-full flex-col rounded-[28px] border border-white/10 bg-[#0b1020] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="rounded-[24px] bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-fuchsia-500/10 p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Dashboard</p>
            <h2 className="mt-1 text-xl font-bold text-white">Control Center</h2>
          </div>
          <Chip size="sm" variant="flat" className="bg-white/10 text-white">
            {user?.role || 'client'}
          </Chip>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
            <FaRegUser />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {user?.name || 'User'}
            </p>
            <p className="truncate text-xs text-zinc-400">{user?.email || 'No email found'}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex-1">
        <p className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Navigation
        </p>
        {navContent}
      </div>

      <div className="mt-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">Need quick access?</p>
        <p className="mt-1 text-xs leading-5 text-zinc-400">
          Use the menu to switch between dashboard sections.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen w-80 shrink-0 border-r border-white/10 bg-[#050816] p-4 lg:block">
        {sidebarPanel}
      </aside>

      <div className="lg:hidden">
        <Drawer>
          <Button
            className="fixed left-4 top-4 z-50 rounded-2xl bg-white/10 text-white backdrop-blur-md"
            variant="flat"
          >
            <BsLayoutSidebar className="text-lg" />
            Menu
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Body className="p-0">
                  <div className="p-4">{sidebarPanel}</div>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}