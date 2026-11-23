import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export interface PrimaryButtonProps {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  size?: 'sm' | 'md';
  tone?: 'dark' | 'navy' | 'cyan' | 'light';
  showArrow?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit';
  className?: string;
}

/**
 * Section 15 — Primary Pill Button:
 * Near-black (#111111) background, white text, pill shape, subtle arrow hover.
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  href,
  external = false,
  onClick,
  size = 'md',
  tone = 'dark',
  showArrow = true,
  disabled = false,
  ariaLabel,
  type = 'button',
  className = '',
}) => {
  const toneClass =
    tone === 'cyan'
      ? 'butia-btn--cyan'
      : tone === 'light'
        ? 'butia-btn--light'
        : 'butia-btn--primary';

  const classes = `butia-btn ${toneClass} ${size === 'sm' ? 'butia-btn--sm' : ''} ${
    disabled ? 'opacity-50 pointer-events-none' : ''
  } ${className}`;

  const content = (
    <>
      <span>{label}</span>
      {showArrow && (
        <span className="butia-btn-arrow" aria-hidden="true">
          {external ? (
            <ArrowUpRight className="w-4 h-4 stroke-[2.1]" />
          ) : (
            <ArrowRight className="w-4 h-4 stroke-[2.1]" />
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
