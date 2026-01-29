import { useEffect } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MonsterCard } from "../../../core/domain/Card";

export const useRewards = (cards: MonsterCard[]) => {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });

  const range = cards.length > 5 ? "40%" : cards.length > 3 ? "25%" : "10%";

  const xTranslate = useTransform(
    smoothMouseX,
    [0, typeof window !== "undefined" ? window.innerWidth : 1000],
    [range, `-${range}`],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  const cardSize = "md";

  return {
    xTranslate,
    cardSize,
    mouseX,
  };
};
