export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface StatItem {
  value: string;
  label: string;
  color: string;
}

export interface NavigationItem {
  href: string;
  label: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export type ConsoleError = {
  message: string;
  stack?: string;
  componentStack?: string;
  code?: string;
  info?: any;
};