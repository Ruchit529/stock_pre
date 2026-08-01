import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  isDarkMode = true,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const darkVariants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm border border-blue-500/50',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700',
    outline: 'border border-blue-500/60 text-blue-400 hover:bg-blue-500/10 hover:text-white',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm border border-rose-500/50',
    ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/50'
  };

  const lightVariants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm border border-blue-700',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-rose-700',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
  };

  const variants = isDarkMode ? darkVariants : lightVariants;

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs gap-2',
    lg: 'px-5 py-2.5 text-sm gap-2'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5 shrink-0" />}
    </button>
  );
}
