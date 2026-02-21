import React from 'react';
import { Info } from 'lucide-react';
import { useViewOverlay } from '../ViewOverlay/hooks/useViewOverlay';

interface CardActionOverlayProps {
  isVisible: boolean;
  isRestricted?: boolean;
  card: any;
}

export const CardActionOverlay: React.FC<CardActionOverlayProps> = ({
  isVisible,
  isRestricted,
  card
}) => {
  const { setViewCard } = useViewOverlay();

  if (!isVisible || isRestricted) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-start pt-4 pointer-events-none animate-in fade-in duration-300">
        <button onClick={() => { setViewCard(card) }}>
            <div className="bg-yellow-400 mt-[-60px] p-1.5 rounded-full shadow-lg border border-yellow-600 mb-2">
                <Info size={18} className="text-yellow-900" />
            </div>
        </button>
    </div>
  );
};
