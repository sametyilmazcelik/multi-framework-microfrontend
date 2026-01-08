import Link from 'next/link';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  target,
  rel
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-glow';

  const variantClasses = {
    primary: 'bg-accent hover:bg-accent-hover text-white',
    secondary: 'glass border border-border hover:border-accent text-text-primary hover:text-accent',
    outline: 'bg-transparent text-text-primary border-2 border-text-primary hover:bg-text-primary hover:text-background',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}

