'use client';

import { Check, Power } from '@gravity-ui/icons';
import { Switch } from '@heroui/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-default-100 transition"
    >
      {theme === 'dark' ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
    </button>
  );
}
