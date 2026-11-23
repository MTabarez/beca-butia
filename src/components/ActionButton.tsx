import React from 'react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

export type ButtonVariant = 'primary' | 'secondary' | 'cyan' | 'magenta' | 'light' | 'explore';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ActionButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  showArrow?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit';
}

/**
 * Unified adapter mapping all button calls across internal pages
 * to the locked Design System V3 PrimaryButton / SecondaryButton tokens.
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  variant = 'primary',
  size = 'md',
  ...rest
}) => {
  const mappedSize = size === 'sm' ? 'sm' : 'md';

  if (variant === 'secondary') {
    return <SecondaryButton {...rest} size={mappedSize} />;
  }

  if (variant === 'cyan') {
    return <PrimaryButton {...rest} tone="cyan" size={mappedSize} />;
  }

  if (variant === 'light') {
    return <PrimaryButton {...rest} tone="light" size={mappedSize} />;
  }

  return <PrimaryButton {...rest} tone="dark" size={mappedSize} />;
};
