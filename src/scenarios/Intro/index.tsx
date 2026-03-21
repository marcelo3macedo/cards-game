import { AnimatePresence, motion } from "framer-motion";
import { useIntroActions, type IntroScenarioProps } from "./hooks/useIntroActions";

export default function IntroScenario({ onFinish }: IntroScenarioProps) {
  const { slide, showText, currentIndex, slides } = useIntroActions({ onFinish });

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
                  fontFamily: "'EB Garamond', serif",
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
