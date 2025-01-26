import { Canvas } from "@react-three/fiber";
import { ChipsPacketBarbecueModel } from "./ChipsPacketBarbecueModel";
import { ChipsPacketBarbecueLight } from "./ChipsPacketBarbecueLight";
import { CSSProperties, useEffect, useState } from "react";
import * as THREE from "three"
import gsap from "gsap";

interface IChipsPacketBarbecueScene {
    url: string
    scrollProgress: number
}

export function ChipsPacketBarbecueScene({ url, scrollProgress }: IChipsPacketBarbecueScene) {
    const [scrollY, setScrollY] = useState(0);
    const [calculatedHeight, setCalculatedHeight] = useState(0);

    // Обработчик прокрутки
    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => setScrollY(window.scrollY));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Анимация при изменении прокрутки
    useEffect(() => {
        const canvas = document.getElementById("chipsPacketBarbecueCanvas");
        if (!canvas) return;

        const windowHeight = window.innerHeight;
        const newCalculatedHeight =
            scrollY -
            (868 + 100 + (windowHeight / 2) * 3 - windowHeight / 4 + windowHeight * 4) +
            windowHeight;

        setCalculatedHeight(newCalculatedHeight);
        gsap.to(
            canvas,
            {
                height: `${window.innerHeight}px`,
                width: `${window.innerWidth + 2000}px`,
                duration: 0.3,
            }
        );

        gsap.to("#dark", {
            opacity: calculatedHeight * 0.0007
        })
    }, [scrollY, scrollProgress]);

    return (
        <Canvas camera={{ position: [0, 0, 10] }} id="chipsPacketBarbecueCanvas"
            style={{
                position: 'absolute',
            }}>
            <ChipsPacketBarbecueLight />
            <ChipsPacketBarbecueModel url={url} scrollY={calculatedHeight} />
        </Canvas >
    );
}
