import { SiNextdotjs, SiAngular, SiSvelte, SiVuedotjs, SiReact } from 'react-icons/si';

type Framework = 'next' | 'react' | 'angular' | 'svelte' | 'vue';

export const frameworkConfig: Record<Framework, {
  label: string;
  icon: React.ReactNode;
  activeBg: string; // Deprecated but kept for backward compat if needed
  activeText: string;
  inactiveBg: string;
  inactiveText: string;
  inactiveBorder: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  color: string;
  gradient: string;
}> = {
  next: {
    label: 'Next.js',
    icon: <SiNextdotjs size={16} />,
    activeBg: 'bg-neutral-900',
    activeText: 'text-white',
    inactiveBg: 'bg-neutral-50',
    inactiveText: 'text-neutral-700',
    inactiveBorder: 'border-neutral-200',
    badgeBg: 'bg-neutral-50 dark:bg-white/5',
    badgeText: 'text-neutral-700 dark:text-neutral-300',
    badgeBorder: 'border-neutral-200 dark:border-white/10',
    color: '#000000',
    gradient: 'from-slate-700 to-slate-900',
  },
  react: {
    label: 'React',
    icon: <SiReact size={16} />,
    activeBg: 'bg-[#61DAFB]',
    activeText: 'text-neutral-900',
    inactiveBg: 'bg-neutral-50',
    inactiveText: 'text-neutral-700',
    inactiveBorder: 'border-neutral-200',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-500/10',
    badgeText: 'text-cyan-700 dark:text-cyan-400',
    badgeBorder: 'border-cyan-200 dark:border-cyan-500/20',
    color: '#61DAFB',
    gradient: 'from-cyan-400 to-blue-500',
  },
  angular: {
    label: 'Angular',
    icon: <SiAngular size={16} />,
    activeBg: 'bg-[#DD0031]',
    activeText: 'text-white',
    inactiveBg: 'bg-neutral-50',
    inactiveText: 'text-neutral-700',
    inactiveBorder: 'border-neutral-200',
    badgeBg: 'bg-red-50 dark:bg-red-500/10',
    badgeText: 'text-red-700 dark:text-red-400',
    badgeBorder: 'border-red-200 dark:border-red-500/20',
    color: '#DD0031',
    gradient: 'from-red-600 to-pink-700',
  },
  svelte: {
    label: 'Svelte',
    icon: <SiSvelte size={16} />,
    activeBg: 'bg-[#FF3E00]',
    activeText: 'text-white',
    inactiveBg: 'bg-neutral-50',
    inactiveText: 'text-neutral-700',
    inactiveBorder: 'border-neutral-200',
    badgeBg: 'bg-orange-50 dark:bg-orange-500/10',
    badgeText: 'text-orange-700 dark:text-orange-400',
    badgeBorder: 'border-orange-200 dark:border-orange-500/20',
    color: '#FF3E00',
    gradient: 'from-orange-500 to-red-600',
  },
  vue: {
    label: 'Vue',
    icon: <SiVuedotjs size={16} />,
    activeBg: 'bg-[#42B883]',
    activeText: 'text-white',
    inactiveBg: 'bg-neutral-50',
    inactiveText: 'text-neutral-700',
    inactiveBorder: 'border-neutral-200',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    badgeText: 'text-emerald-700 dark:text-emerald-400',
    badgeBorder: 'border-emerald-200 dark:border-emerald-500/20',
    color: '#42B883',
    gradient: 'from-emerald-500 to-green-600',
  },
};

