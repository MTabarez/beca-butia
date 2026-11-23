import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export interface SecondaryButtonProps {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  size?: 'sm' | 'md';
  onDark?: boolean;
  showArrow?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit';
  className?: string;
}

/**
 * Design System V3 — 6.3 Secondary Button
 * Default: Transparent bg, 1px Navy border, Navy text (or light inverted on dark/video surfaces)
 * Hover: Navy bg + White text (or White bg + Navy text on dark)
 */
export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  label,
  href,
  external = false,
  onClick,
  size = 'md',
  onDark = false,
  showArrow = true,
  disabled = false,
  ariaLabel,
  type = 'button',
  className = '',
}) => {
  const classes = `butia-btn ${
    onDark ? 'butia-btn--secondary-light' : 'butia-btn--secondary'
  } ${size === 'sm' ? 'butia-btn--sm' : ''} ${
    disabled ? 'opacity-50 pointer-events-none' : ''
  } ${className}`;

  const content = (
    <>
      <span>{label}</span>
      {showArrow && (
        <span className="butia-btn-arrow" aria-hidden="true">
          {external ? (
            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
          ) : (
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          )}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </button>
  );
};
