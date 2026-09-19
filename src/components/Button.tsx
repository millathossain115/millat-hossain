import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-full border border-[#DC143C] bg-[#DC143C] px-4 py-2 font-semibold text-white transition-all duration-300 active:scale-95 cursor-pointer hover:border-white/60 hover:bg-[#b01031] hover:shadow-[0_0_28px_rgba(220,20,60,0.26)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
