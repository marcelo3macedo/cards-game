import { useEffect, useRef, useState } from "react";
import backgroundSoundSrc from "../assets/sounds/background_sound.mp3";
import type { ScenarioType } from "./useNavigation";

const VOLUME_KEY = "bgm_volume";
const DEFAULT_VOLUME = 0.3;

export function useBackgroundMusic(currentScenario: ScenarioType) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem(VOLUME_KEY);
    return saved !== null ? parseFloat(saved) : DEFAULT_VOLUME;
  });

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio(backgroundSoundSrc);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play/pause based on scenario
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentScenario === "BATTLE") {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Autoplay blocked — will resume on next user interaction
        const resume = () => {
          audio.play().catch(() => {});
          document.removeEventListener("click", resume);
          document.removeEventListener("keydown", resume);
        };
        document.addEventListener("click", resume, { once: true });
        document.addEventListener("keydown", resume, { once: true });
      });
    }
  }, [currentScenario]);

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    localStorage.setItem(VOLUME_KEY, String(clamped));
    if (audioRef.current) audioRef.current.volume = clamped;
  };

  return { volume, setVolume };
}
