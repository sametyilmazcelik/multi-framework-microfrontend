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
  const baseClasses = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105';
  
  const variantClasses = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
    secondary: 'bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50',
    outline: 'bg-transparent text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white',
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

