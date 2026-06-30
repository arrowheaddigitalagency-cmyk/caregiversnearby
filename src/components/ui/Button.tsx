import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-brand-blue text-white shadow-md shadow-brand-blue/10 hover:bg-brand-blue-hover hover:shadow-lg hover:shadow-brand-blue/20 hover:-translate-y-0.5",
    secondary: "bg-brand-teal text-white shadow-md shadow-brand-teal/10 hover:bg-brand-teal-hover hover:shadow-lg hover:shadow-brand-teal/20 hover:-translate-y-0.5",
    outline: "border border-slate-200 bg-white/50 backdrop-blur-sm text-brand-navy hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5",
    ghost: "text-brand-navy hover:bg-slate-100 hover:text-brand-navy-light",
    gold: "bg-brand-gold text-white shadow-md shadow-brand-gold/10 hover:bg-amber-600 hover:shadow-lg hover:shadow-brand-gold/20 hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2 inline-flex shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2 inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {content}
    </button>
  );
}
