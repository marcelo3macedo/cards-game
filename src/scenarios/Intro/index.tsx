import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import img1 from "../../assets/intro/1_spaceship.jpg";
import img2 from "../../assets/intro/2_crash.jpg";
import img3 from "../../assets/intro/3_fall.jpg";
import img4 from "../../assets/intro/4_ruins.jpg";
import img5 from "../../assets/intro/5_device.jpg";
import img6 from "../../assets/intro/6_world.jpg";

interface IntroScenarioProps {
  onFinish: () => void;
}

const slides = [
  {
    image: img1,
    lines: ["Você estava viajando em uma cápsula espacial…", "quando algo deu errado."],
    duration: 4500,
  },
  {
    image: img2,
    lines: ["Uma falha no sistema partiu a nave durante a queda."],
    duration: 4000,
  },
  {
    image: img3,
    lines: ["Ao acordar, você percebe que está sozinho", "em um planeta desconhecido."],
    duration: 4500,
  },
  {
    image: img4,
    lines: [
      "Ruínas e destroços estão espalhados por toda parte.",
      "Este mundo já foi habitado… mas agora está destruído.",
    ],
    duration: 5500,
  },
  {
    image: img5,
    lines: [
      "Entre os restos da nave, apenas um dispositivo sobreviveu.",
      "Um artefato capaz de fazer o impossível:",
      "invocar monstros através de cartas.",
    ],
    duration: 6000,
  },
  {
    image: img6,
    lines: [
      "Agora você precisa explorar as ruínas, enfrentar criaturas…",
      "e encontrar uma forma de escapar deste planeta.",
      "Talvez, em algum lugar entre os escombros…",
      "exista uma saída.",
    ],
    duration: 7000,
  },
];

export default function IntroScenario({ onFinish }: IntroScenarioProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showText, setShowText] = useState(false);

  const skip = useCallback(() => {
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    const handleKey = () => skip();
    const handleClick = () => skip();
    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handleClick);
    };
  }, [skip]);

  useEffect(() => {
    setShowText(false);
    const textTimer = setTimeout(() => setShowText(true), 600);
    const advanceTimer = setTimeout(() => {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        onFinish();
      }
    }, slides[currentIndex].duration);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(advanceTimer);
    };
  }, [currentIndex, onFinish]);

  const slide = slides[currentIndex];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden cursor-pointer" style={{ zIndex: 9999 }}>
      {/* Background Image with Ken Burns zoom */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ opacity: 0, scale: 1.0 }}
          animate={{ opacity: 1, scale: 1.12 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: slide.duration / 1000, ease: "linear" },
          }}
        />
      </AnimatePresence>

      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-black" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black" />

      {/* Dark gradient overlay for subtitle readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Subtitle text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            key={`text-${currentIndex}`}
            className="absolute left-0 right-0 flex flex-col items-center gap-1 px-12"
            style={{ bottom: "80px" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {slide.lines.map((line, i) => (
              <p
                key={i}
                className="text-white text-center leading-relaxed"
                style={{
                  fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)",
                  fontFamily: "'Georgia', serif",
                  fontStyle: "italic",
                  textShadow:
                    "0 1px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,1)",
                  letterSpacing: "0.02em",
                }}
              >
                {line}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip hint */}
      <motion.p
        className="absolute left-0 right-0 text-center text-white/50 text-xs tracking-widest uppercase"
        style={{ bottom: "28px" }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Pressione qualquer tecla para prosseguir
      </motion.p>

      {/* Slide progress dots */}
      <div className="absolute left-0 right-0 flex justify-center gap-2" style={{ top: "28px" }}>
        {slides.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === currentIndex ? "20px" : "6px",
              height: "6px",
              background: i === currentIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
