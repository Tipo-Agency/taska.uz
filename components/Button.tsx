import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  icon,
  ...props 
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary:
      "bg-brand hover:bg-brand-dark text-white shadow-glow hover:shadow-[0_10px_36px_-6px_rgba(44,126,32,0.35)] border border-transparent hover:-translate-y-px active:translate-y-0 active:scale-[0.99]",
    secondary:
      "bg-canvas-elevated text-ink hover:bg-white shadow-soft hover:shadow-soft-lg border border-slate-200/90 hover:border-slate-300/80 active:scale-[0.99]",
    outline:
      "bg-transparent border border-slate-300/90 text-ink-muted hover:bg-slate-50 hover:border-slate-400/60 active:scale-[0.99]",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm", // Reduced from px-6 py-3 for sleeker look
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};