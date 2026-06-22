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

export function DashboardSidebar() {
  const navItems = [
    { icon: House, href:"/dashboard/lawyer" , label: 'Home' },
    { icon: FaBriefcase, href:"/dashboard/lawyer/jobs" , label: 'Jobs' },
    { icon: FaPerson, href:"/dashboard/lawyer/manage-legal-profile" , label: 'Manage-Profile' },
    { icon: FaHistory, href:"/dashboard/lawyer/hiring-history" , label: 'Hiring-History' },
   
  ];
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
        { navContent}
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
                { navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
