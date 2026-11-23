import React from 'react';
import { ImageReveal } from './ImageReveal';
import { ActionButton, type ButtonVariant } from './ActionButton';

export interface EditorialSectionProps {
  id?: string;
  heading: string;
  lead?: string;
  paragraphs: string[];
  bullets?: string[];
  image: { src: string; alt: string; caption?: string };
  secondaryInsetImage?: { src: string; alt: string };
  imagePosition?: 'left' | 'right';
  cta?: {
    label: string;
    href?: string;
    external?: boolean;
    variant?: ButtonVariant;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  };
  headingSize?: 'section' | 'secondary';
  className?: string;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  id,
  heading,
  lead,
  paragraphs,
  bullets,
  image,
  secondaryInsetImage,
  imagePosition = 'left',
  cta,
  headingSize = 'section',
  className = '',
}) => {
  const isImageLeft = imagePosition === 'left';

  return (
    <div id={id} className={`scroll-mt-24 butia-container py-20 md:py-28 lg:py-[120px] ${className}`}>
      <div className="max-w-3xl mb-12 md:mb-16">
        <h2 className={headingSize === 'section' ? 'type-h1 text-[#111111]' : 'type-h2 text-[#111111]'}>
          {heading}
        </h2>
      </div>

      {/* 12-Column Asymmetrical Media + Prose Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div
          className={`lg:col-span-5 ${
            isImageLeft ? 'lg:order-1' : 'lg:order-2 lg:col-start-8'
          }`}
        >
          <ImageReveal
            src={image.src}
            alt={image.alt}
            caption={image.caption}
            aspectClass="aspect-[4/3]"
            parallaxStrength={18}
          />
        </div>

        <div
          className={`lg:col-span-6 flex flex-col justify-between h-full ${
            isImageLeft ? 'lg:order-2 lg:col-start-7' : 'lg:order-1 lg:col-start-1'
          }`}
        >
          <div className="max-w-xl">
            {lead && (
              <p className="type-body-lg font-medium text-[#111111] mb-5 leading-[1.45]">
                {lead}
              </p>
            )}

            <div className="space-y-4 type-body text-[#454545]">
              {paragraphs.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>

            {bullets && bullets.length > 0 && (
              <ul className="mt-8 border-t border-[#D8D8D8] divide-y divide-[#D8D8D8]">
                {bullets.map((item, idx) => (
                  <li key={idx} className="py-3.5 type-body-sm text-[#111111] font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {cta && (
              <div className="mt-8">
                <ActionButton
                  label={cta.label}
                  href={cta.href}
                  external={cta.external}
                  variant={cta.variant ?? 'primary'}
                  onClick={cta.onClick}
                />
              </div>
            )}
          </div>

          {secondaryInsetImage && (
            <div className="hidden lg:block mt-12 self-end w-48">
              <ImageReveal
                src={secondaryInsetImage.src}
                alt={secondaryInsetImage.alt}
                aspectClass="aspect-[3/4]"
                parallaxStrength={12}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
