import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROGRAM_VISUAL_BLOCKS } from '../data/becasContent';
import type { AppRoute } from '../utils/becaHelpers';

export interface ProgramSupportGridProps {
  onNavigate: (route: AppRoute, hash?: string) => void;
}

/**
 * Complete Design Revision — Section 11B:
 * How the program supports students (4 concepts) in a balanced 2x2 editorial grid.
 * Restrained neutral surfaces with crisp #111111 typography — zero rainbow overload,
 * zero section numbering, zero decorative eyebrows.
 */
export const ProgramSupportGrid: React.FC<ProgramSupportGridProps> = ({ onNavigate }) => {
  return (
    <div id="como-funciona" className="scroll-mt-24 butia-container py-20 md:py-28 lg:py-[128px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-16">
        <div className="lg:col-span-7">
          <h2 className="type-h1 text-[#111111]">Cómo acompaña tu trayectoria</h2>
        </div>
        <div className="lg:col-span-5">
          <p className="type-body text-[#454545]">
            El programa articula respaldo económico, cercanía pedagógica y coordinación pública para
            sostener la continuidad en la educación media en todo el país.
          </p>
        </div>
      </div>

      {/* Balanced 2x2 Four-Item Text-Only Editorial Grid (50% width on mobile & desktop) */}
      <div
        data-testid="program-support-grid"
        className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8"
      >
        {PROGRAM_VISUAL_BLOCKS.map((item) => (
          <article
            key={item.id}
            className="hover-media-card rounded-[18px] sm:rounded-[24px] bg-[#392665] border border-white/10 hover:border-white/25 p-4 sm:p-8 md:p-10 min-h-[212px] sm:min-h-[248px] md:min-h-[268px] flex flex-col justify-between gap-5 sm:gap-8 transition-colors duration-300"
          >
            <div>
              <h3 className="font-display font-medium text-[17px] sm:text-[26px] md:text-[30px] leading-[1.16] tracking-[-0.025em] text-white">
                {item.title}
              </h3>
              <p className="mt-2.5 sm:mt-4 text-[13px] sm:text-[16px] leading-[1.45] sm:leading-[1.6] text-white/88 max-w-lg">
                {item.description}
              </p>
            </div>

            <div className="flex items-center">
              <a
                href={`${item.route}${item.hash}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.route, item.hash);
                }}
                aria-label={`Explorar ${item.title}`}
                className="butia-explore-pill butia-explore-pill--light !h-[34px] sm:!h-[38px] !px-3.5 sm:!px-[18px] !text-[12.5px] sm:!text-[13.5px]"
              >
                <span className="butia-explore-pill__arrow-left" aria-hidden="true">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                </span>
                <span>Explorar</span>
                <span className="butia-explore-pill__arrow-right" aria-hidden="true">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
