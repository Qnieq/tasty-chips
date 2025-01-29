import { Canvas } from "@react-three/fiber";
import { CSSProperties, useEffect, useRef, useState } from "react";
import * as THREE from "three"
import gsap from "gsap";
import { ChipsPacketOnionLight } from "./ChipsPacketOnionLight";
import { ChipsPacketOnionModel } from "./ChipsPacketOnionModel";

export function ChipsPacketOnionScene({ url, position }: { url: string, position: CSSProperties['position'] }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if ((((Math.PI * 2) * scrollY - 100) / (((window.innerHeight / 2) * 3 + 868) - 100 - 20)) / 0.70 <= Math.PI * 2) {
            gsap.to('#chipsPacketOnionCanvas', {
                y: scrollY, 
                ease: 'power1.out', 
                duration: 0.3, 
            });
        }

    }, [scrollY]);

    return (
        <Canvas camera={{ position: [0, 0, 5.7] }} id="chipsPacketOnionCanvas"
            style={{
                position: position,
                pointerEvents: 'none'
            }}>
            <ChipsPacketOnionLight />
            <ChipsPacketOnionModel url={url} scrollY={scrollY} />
        </Canvas >
    );
}
