import { SiNextdotjs, SiAngular, SiSvelte, SiVuedotjs } from 'react-icons/si';

type Framework = 'react' | 'angular' | 'svelte' | 'vue';

export const frameworkConfig: Record<Framework, {
  label: string;
  icon: React.ReactNode;
  activeBg: string;
  activeText: string;
  inactiveBg: string;
  inactiveText: string;
  inactiveBorder: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  color: string;
}> = {
  react: {
    label: 'Next.js',
    icon: <SiNextdotjs size={16} />,
    activeBg: 'bg-neutral-900 dark:bg-white',
    activeText: 'text-white dark:text-neutral-900',
    inactiveBg: 'bg-neutral-50 dark:bg-neutral-800',
    inactiveText: 'text-neutral-700 dark:text-neutral-300',
    inactiveBorder: 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white',
    badgeBg: 'bg-neutral-50 dark:bg-neutral-800',
    badgeText: 'text-neutral-700 dark:text-neutral-300',
    badgeBorder: 'border-neutral-200 dark:border-neutral-700',
    color: '#000000',
  },
  angular: {
    label: 'Angular',
    icon: <SiAngular size={16} />,
    activeBg: 'bg-[#DD0031]',
    activeText: 'text-white',
    inactiveBg: 'bg-neutral-50 dark:bg-neutral-800',
    inactiveText: 'text-neutral-700 dark:text-neutral-300',
    inactiveBorder: 'border-neutral-200 dark:border-neutral-700 hover:border-[#DD0031]',
    badgeBg: 'bg-red-50 dark:bg-red-900/20',
    badgeText: 'text-red-700 dark:text-red-400',
    badgeBorder: 'border-red-200 dark:border-red-800',
    color: '#DD0031',
  },
  svelte: {
    label: 'Svelte',
    icon: <SiSvelte size={16} />,
    activeBg: 'bg-[#FF3E00]',
    activeText: 'text-white',
    inactiveBg: 'bg-neutral-50 dark:bg-neutral-800',
    inactiveText: 'text-neutral-700 dark:text-neutral-300',
    inactiveBorder: 'border-neutral-200 dark:border-neutral-700 hover:border-[#FF3E00]',
    badgeBg: 'bg-orange-50 dark:bg-orange-900/20',
    badgeText: 'text-orange-700 dark:text-orange-400',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    color: '#FF3E00',
  },
  vue: {
    label: 'Vue',
    icon: <SiVuedotjs size={16} />,
    activeBg: 'bg-[#42B883]',
    activeText: 'text-white',
    inactiveBg: 'bg-neutral-50 dark:bg-neutral-800',
    inactiveText: 'text-neutral-700 dark:text-neutral-300',
    inactiveBorder: 'border-neutral-200 dark:border-neutral-700 hover:border-[#42B883]',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    badgeText: 'text-emerald-700 dark:text-emerald-400',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    color: '#42B883',
  },
};

