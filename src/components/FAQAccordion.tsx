import React, { useState } from 'react';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { FAQ_ITEMS, type FAQItem } from '../data/becasContent';

export interface FAQAccordionProps {
  id?: string;
  items?: FAQItem[];
  heading?: string;
  intro?: string;
}

/**
 * Restrained Editorial FAQ Accordion:
 * Near-black #111111 typography, clean hairlines, circular +/- toggle, zero decorative eyebrows.
 */
export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  id = 'preguntas-frecuentes',
  items = FAQ_ITEMS,
  heading = 'Preguntas frecuentes',
  intro = 'Respuestas directas sobre postulación, montos, cobros y acompañamiento educativo.',
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggleItem = (itemId: string) => {
    setOpenId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <div id={id} className="scroll-mt-24 butia-container py-20 md:py-28 lg:py-[128px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <h2 className="type-h1 text-[#111111]">{heading}</h2>
          <p className="mt-4 type-body text-[#454545]">{intro}</p>
        </div>

        <div className="lg:col-span-8 border-t border-[#111111]/15 divide-y divide-[#111111]/12">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-trigger-${item.id}`;

            return (
              <div key={item.id} className="py-1">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-6 flex items-center justify-between gap-6 text-left group cursor-pointer"
                  >
                    <span className="font-display font-medium text-[19px] md:text-[22px] leading-snug tracking-[-0.025em] text-[#111111] group-hover:text-[#009FE3] transition-colors">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#111111] border-[#111111] text-white'
                          : 'bg-transparent border-[#111111]/25 text-[#111111] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-open={isOpen}
                  className="accordion-panel"
                >
                  <div className="accordion-panel-inner">
                    <div className="pb-6 pr-6 md:pr-14 type-body text-[#454545]">
                      <p>{item.answer}</p>
                      {item.extraLines && item.extraLines.length > 0 && (
                        <ul className="mt-3 space-y-1.5 type-body-sm text-[#111111] font-medium">
                          {item.extraLines.map((line) => (
                            <li key={line}>· {line}</li>
                          ))}
                        </ul>
                      )}
                      {item.highlightLink && (
                        <a
                          href={item.highlightLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-4 font-semibold text-[15px] text-[#111111] underline decoration-[#009FE3] decoration-2 underline-offset-4 hover:text-[#009FE3] transition-colors"
                        >
                          <span>{item.highlightLink.label}</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
