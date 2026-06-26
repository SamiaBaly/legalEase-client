"use client"

import { getUserSession } from '@/lib/core/session';
import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from '@gravity-ui/icons';
import { Button, Drawer } from '@heroui/react';
import Link from 'next/link';
import { BsLayoutSidebar } from 'react-icons/bs';
import { FaBriefcase, FaHistory } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';

export function DashboardSidebar({ user }) {


  const clientNavLinks = [
    { icon: House, href: "/dashboard/client", label: 'Home' },
    { icon: FaPerson, href: "/dashboard/client/update-profile", label: 'Manage-Profile' },
    { icon: FaPerson, href: "/dashboard/client/comments", label: 'Comments-history' },
    { icon: FaHistory, href: "/dashboard/client/hiring-history", label: 'Hiring-History' },
    { icon: FaHistory, href: "/dashboard/client/transactions", label: 'Transactions' }
  ]
  const lawyerNavLinks = [
    { icon: House, href: "/dashboard/lawyer", label: 'Home' },
    { icon: FaPerson, href: "/dashboard/lawyer/manage-legal-profile/my-post-service", label: 'My-post-service' },
    { icon: FaPerson, href: "/dashboard/lawyer/manage-legal-profile/post-service", label: 'Post-service' },
    { icon: FaHistory, href: "/dashboard/lawyer/hiring-history", label: 'Hiring-History' }
  ]
  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: 'Home' },
    { icon: FaBriefcase, href: "/dashboard/admin/all-transactions", label: 'Transactions' },
    { icon: FaPerson, href: "/dashboard/admin/analytics", label: 'Analytics' },
    { icon: FaHistory, href: "/dashboard/admin/manage-users", label: 'Manage-users' }
  ]

  const navLinksMap = {
    client: clientNavLinks,
    lawyer: lawyerNavLinks,
    admin: adminNavLinks
  }


  const navItems = navLinksMap[user.role || 'client'];


  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map(item => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrin-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className={'lg:hidden'} variant="secondary">
          <BsLayoutSidebar />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
