import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';
import { SEARCH_INDEX } from '../data/becasContent';
import { searchSiteContent, type AppRoute, type SearchableItem } from '../utils/becaHelpers';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: AppRoute, hash?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(() => searchSiteContent(query, SEARCH_INDEX), [query]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (item: SearchableItem) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      onClose();
      return;
    }
    onNavigate(item.route, item.hash);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-[#111111]/55 backdrop-blur-sm px-4 pt-20 md:pt-28 pb-8"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar en Becas Butiá"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl rounded-[22px] bg-[#F1F1EF] text-[#111111] shadow-2xl overflow-hidden border border-[#111111]/12">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#D8D8D8] bg-white">
          <Search className="w-5 h-5 text-[#454545] shrink-0" aria-hidden="true" />
          <label htmlFor="butia-search-input" className="sr-only">
            Buscar información sobre las Becas Butiá
          </label>
          <input
            ref={inputRef}
            id="butia-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscá requisitos, montos, modalidades, acuerdo educativo..."
            className="w-full bg-transparent text-[16px] text-[#111111] placeholder:text-[#454545] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar buscador"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#111111] hover:bg-[#F1F1EF] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3 md:p-4">
          {results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="type-h4 text-[#111111]">
                No encontramos resultados para «{query}»
              </p>
              <p className="mt-2 type-body-sm text-[#454545]">
                Probá con palabras como «requisitos», «UTU», «montos», «acuerdo» o «Ceibal».
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#D8D8D8]">
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-4 py-3.5 rounded-[12px] hover:bg-white transition-colors flex items-start justify-between gap-4 cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <span className="text-[12px] font-medium text-[#454545]">
                        {item.category}
                      </span>
                      <p className="font-display font-medium text-[17px] text-[#111111] mt-0.5 leading-snug">
                        {item.title}
                      </p>
                      <p className="type-body-sm text-[#454545] mt-1 line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                    <span
                      className="mt-1 shrink-0 text-[#454545] group-hover:text-[#111111] group-hover:translate-x-0.5 transition-all"
                      aria-hidden="true"
                    >
                      {item.externalUrl ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
