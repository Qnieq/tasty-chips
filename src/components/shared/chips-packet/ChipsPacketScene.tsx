import { Canvas } from "@react-three/fiber";
import { ChipsPacketModel } from "./ChipsPacketModel";
import { ChipsPacketLight } from "./ChipsPacketLight";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three"
import gsap from "gsap";

export function ChipsPacketScene() {
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
            gsap.to('#chipsPacketCanvas', {
                y: scrollY, // Перемещаем canvas по оси Y
                ease: 'power1.out', // Плавное движение
                duration: 0.3, // Время анимации
            });
        }


    }, [scrollY]); // Эффект срабатывает при изменении scrollY

    return (
        <Canvas camera={{ position: [0, 0, 5.7] }} id="chipsPacketCanvas"
            style={{
                position: 'absolute'
            }}>
            <ChipsPacketLight />
            <ChipsPacketModel url="/models/chips-packet-Barbecue.glb" scrollY={scrollY} />
        </Canvas >
    );
}
