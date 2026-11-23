import React from 'react';

export interface IconButtonProps {
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
  onDark?: boolean;
  expanded?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Design System V3 — 6.4 Icon Button
 * 44px circular, 1px border, centered icon, Butiá Cyan hover
 */
export const IconButton: React.FC<IconButtonProps> = ({
  ariaLabel,
  onClick,
  disabled = false,
  onDark = false,
  expanded,
  className = '',
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={expanded}
      className={`butia-icon-btn ${onDark ? 'butia-icon-btn--on-dark' : ''} ${className}`}
    >
      {children}
    </button>
  );
};
