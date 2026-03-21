import { useRef, useEffect } from "react";

const LONG_PRESS_DURATION = 500;

interface UseHandTouchProps {
  cards: any[];
  isMobile: boolean;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  isFusionMode: boolean;
  toggleFusionCard: (index: number) => void;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function useHandTouch({
  cards,
  isMobile,
  selectedIndex,
  setSelectedIndex,
  isFusionMode,
  toggleFusionCard,
  cardRefs,
}: UseHandTouchProps) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTriggered = useRef(false);

  useEffect(() => {
    if (!isMobile) return;
    const el = cardRefs.current[selectedIndex];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selectedIndex, isMobile, cardRefs]);

  const handleTouchStart = (e: React.TouchEvent, cardIndex?: number) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    longPressTriggered.current = false;

    if (cardIndex !== undefined) {
      longPressTimer.current = setTimeout(() => {
        longPressTriggered.current = true;
        toggleFusionCard(cardIndex);
      }, LONG_PRESS_DURATION);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    if (touchStartX.current === null) return;

    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = Math.abs((touchStartY.current ?? 0) - e.changedTouches[0].clientY);
    const threshold = 40;

    // Only swipe if not a long press and mostly horizontal
    if (!longPressTriggered.current && deltaY < 30) {
      if (deltaX > threshold) {
        setSelectedIndex((prev) => Math.min(prev + 1, cards.length - 1));
      } else if (deltaX < -threshold) {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleTouchMove = () => {
    // Cancel long press if finger moves
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleContainerTouchStart = (e: React.TouchEvent) => handleTouchStart(e);

  return { handleTouchStart, handleContainerTouchStart, handleTouchEnd, handleTouchMove, longPressTriggered };
}
