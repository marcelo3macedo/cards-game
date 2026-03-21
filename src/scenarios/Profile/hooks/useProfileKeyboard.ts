import { useEffect, useRef, useState } from "react";
import type { ProfilePicture } from "./useProfileRegistration";

interface Options {
  name: string;
  gender: "boy" | "girl";
  setGender: (g: "boy" | "girl") => void;
  setSelectedAvatarId: (id: number | null) => void;
  filteredAvatars: ProfilePicture[];
  handleConfirm: () => void;
  isLoading: boolean;
}

export function useProfileKeyboard({
  name,
  gender,
  setGender,
  setSelectedAvatarId,
  filteredAvatars,
  handleConfirm,
  isLoading,
}: Options) {
  const [focusedSection, setFocusedSection] = useState(0);
  const [focusedAvatarIndex, setFocusedAvatarIndex] = useState(0);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusedSection === 0) nameInputRef.current?.focus();
    else nameInputRef.current?.blur();
  }, [focusedSection]);

  useEffect(() => {
    if (focusedSection !== 2 || !gridRef.current) return;
    const items = gridRef.current.querySelectorAll("[data-avatar-idx]");
    items[focusedAvatarIndex]?.scrollIntoView({ block: "nearest" });
  }, [focusedSection, focusedAvatarIndex]);

  const getGridCols = () => {
    if (!gridRef.current) return 3;
    return getComputedStyle(gridRef.current).gridTemplateColumns.split(" ").length || 3;
  };

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (focusedSection === 0) {
        if ((e.key === "Enter" || e.key == "Tab") && name.trim()) {
          e.preventDefault();
          setFocusedSection(1);
        }
        return;
      }

      if (focusedSection === 1) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          setGender(gender === "boy" ? "girl" : "boy");
          setSelectedAvatarId(null);
        } else if (e.key === "Enter") {
          e.preventDefault();
          setFocusedAvatarIndex(0);
          if (filteredAvatars.length > 0) setSelectedAvatarId(filteredAvatars[0].id);
          setFocusedSection(2);
        } else if ((e.key === "Escape") || (e.key === "Backspace")) {
          e.preventDefault();
          setFocusedSection(0);
        }
        return;
      }

      if (focusedSection === 2) {
        const len = filteredAvatars.length;
        const cols = getGridCols();

        const navigate = (idx: number) => {
          const clamped = Math.max(0, Math.min(len - 1, idx));
          setFocusedAvatarIndex(clamped);
          if (filteredAvatars[clamped]) setSelectedAvatarId(filteredAvatars[clamped].id);
        };

        if (e.key === "ArrowLeft") { e.preventDefault(); navigate(focusedAvatarIndex - 1); }
        else if (e.key === "ArrowRight") { e.preventDefault(); navigate(focusedAvatarIndex + 1); }
        else if (e.key === "ArrowUp") { e.preventDefault(); navigate(focusedAvatarIndex - cols); }
        else if (e.key === "ArrowDown") { e.preventDefault(); navigate(focusedAvatarIndex + cols); }
        else if (e.key === "Enter") { e.preventDefault(); if (!isLoading) handleConfirm(); }
        else if (e.key === "Escape" || e.key === "Backspace") { e.preventDefault(); setFocusedSection(1); }
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [focusedSection, name, gender, filteredAvatars, focusedAvatarIndex, isLoading, handleConfirm, setGender, setSelectedAvatarId]);

  return { focusedSection, setFocusedSection, focusedAvatarIndex, nameInputRef, gridRef };
}
