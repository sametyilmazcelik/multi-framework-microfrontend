'use client';

import { useEffect, useState } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    // Default to dark mode
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('light', initialTheme === 'light');
    if (!savedTheme) {
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg glass transition-all duration-200">
        <HiSun size={20} className="text-text-secondary" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg glass hover:glow-hover transition-all duration-200 hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <HiMoon size={20} className="text-text-secondary" />
      ) : (
        <HiSun size={20} className="text-text-secondary" />
      )}
    </button>
  );
}

