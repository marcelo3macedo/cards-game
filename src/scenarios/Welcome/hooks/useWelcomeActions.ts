import { useEffect } from "react";
import { playClickSound } from "../../../utils/soundUtils";

export function useWelcomeActions({ onStart }: any) {
    useEffect(() => {
        window.addEventListener("keydown", handleInitAction);
        return () => window.removeEventListener("keydown", handleInitAction);
    }, [onStart]);

    const handleInitAction = (e:any) => {
        if (e) {
            e.preventDefault();
        }

        playClickSound();
        onStart();
    };

    return {
        handleInitAction
    }
}
