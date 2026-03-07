import clickSoundSrc from "../assets/sounds/click_sound.mp3";

export function playClickSound() {
  const audio = new Audio(clickSoundSrc);
  audio.volume = 1.0;
  audio.play().catch(() => {});
}
