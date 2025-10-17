import React from 'react';
import './Badge.css';

interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium' | 'large';
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'medium'
}) => {
  const badgeClasses = `badge badge-${variant} badge-${size} ${className}`;

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;
