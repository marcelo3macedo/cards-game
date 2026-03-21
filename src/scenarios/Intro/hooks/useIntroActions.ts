import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import img1 from "../../../assets/intro/1_spaceship.jpg";
import img2 from "../../../assets/intro/2_crash.jpg";
import img3 from "../../../assets/intro/3_fall.jpg";
import img4 from "../../../assets/intro/4_ruins.jpg";
import img5 from "../../../assets/intro/5_device.jpg";
import img6 from "../../../assets/intro/6_world.jpg";

export interface IntroScenarioProps {
  onFinish: () => void;
}
export function useIntroActions({ onFinish }: IntroScenarioProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(false);

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

    const skip = useCallback(() => {
        onFinish();
    }, [onFinish]);

    useEffect(() => {
        const handleKey = (e: any) => {
            e.preventDefault();
            skip();
        }
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

    return {
        slide,
        slides,
        showText,
        currentIndex
    }
}
