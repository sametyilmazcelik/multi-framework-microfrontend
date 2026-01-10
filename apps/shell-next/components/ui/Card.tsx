import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`
      relative overflow-hidden
      bg-surface/30 backdrop-blur-md 
      border border-border/50 
      rounded-2xl p-6 
      shadow-xl 
      transition-all duration-300 
      group
      ${className}
    `}>
      {/* Glossy gradient overlay - Subtle by default */}
      <div className="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
