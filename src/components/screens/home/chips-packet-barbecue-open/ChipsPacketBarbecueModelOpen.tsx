import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

interface IChipsPacketBarbecueModel {
    url: string;
    scrollY: number;
}

export function ChipsPacketBarbecueModelOpen({ url, scrollY }: IChipsPacketBarbecueModel) {
    const { scene } = useGLTF(url);

    const modelRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (modelRef.current) {
            const rotationY = -(900 / scrollY);
            const rotationZ = -(351 / scrollY);

            const positionX = (3000 / scrollY);
            const positionY = (601 / scrollY) - 2;
            
            const scale3D = (1400 / scrollY);

            const threshold = window.innerHeight + (window.innerHeight / 4);

            // Анимация вращения
            if (scrollY >= threshold) {
                gsap.to(modelRef.current.rotation, {
                    y: -0.1,
                    z: -0.3,
                    duration: 2,
                });

                // Анимация позиции
                gsap.to(modelRef.current.position, {
                    x: -0.5,
                    y: -2.5,
                    duration: 2,
                });

                gsap.to(modelRef.current.scale, {
                    x: 1.6,
                    y: 1.6,
                    z: 1.6,
                    duration: 2,
                })
            } else if (scrollY >= 0 && scrollY < threshold) {

                gsap.to(modelRef.current.rotation, {
                    y: rotationY <= -3 ? -3 : rotationY,
                    z: rotationZ <= -1.5 ? -1.5 : rotationZ,
                    duration: 1,
                });

                // Анимация позиции
                gsap.to(modelRef.current.position, {
                    x: positionX >= 15.5 ? 15.5 : positionX,
                    y: positionY <= -2 ? -2 : positionY,
                    duration: 1,
                });

                gsap.to(modelRef.current.scale, {
                    x: scale3D >= 6 ? 6 : scale3D + 1,
                    y: scale3D >= 6 ? 6 : scale3D + 1,
                    z: scale3D >= 6 ? 6 : scale3D + 1,
                    duration: 1,
                })
            }
        }
    }, [scrollY]);


    return (
        <mesh
            ref={modelRef}
            scale={[6, 6, 6]}
            position={[15.5, -2, 1]}
            rotation={[0.1, -3, -1.5 ]}
        >
            <primitive object={scene} />
        </mesh>
    );
}
