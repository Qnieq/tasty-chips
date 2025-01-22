import { Canvas } from "@react-three/fiber";
import { ChipsPacketBarbecueModel } from "./ChipsPacketBarbecueModel";
import { ChipsPacketBarbecueLight } from "./ChipsPacketBarbecueLight";
import { CSSProperties, useEffect, useState } from "react";
import * as THREE from "three"
import gsap from "gsap";

export function ChipsPacketBarbecueScene({ url, position }: { url: string, position: CSSProperties['position'] }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Функция для отслеживания скролла
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        // Добавляем обработчик события scroll
        window.addEventListener('scroll', handleScroll);

        // Убираем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if ((((Math.PI * 2) * scrollY - 100) / (((window.innerHeight / 2) * 3 + 868) - 100 - 20)) / 0.70 <= Math.PI * 2) {

        }

    }, [scrollY]);

    return (
        <Canvas camera={{ position: [0, 0, 5.7] }} id="chipsPacketBarbecueCanvas"
            style={{
                position: position
            }}>
            <ChipsPacketBarbecueLight />
            <ChipsPacketBarbecueModel url={url} scrollY={scrollY} />
        </Canvas >
    );
}
