import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

interface IChipsPacketBarbecueModel {
    url: string;
    scrollY: number;
}

export function ChipsPacketBarbecueModel({ url, scrollY }: IChipsPacketBarbecueModel) {
    const { scene } = useGLTF(url);

    const modelRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (modelRef.current) {
            const rotationY = -(scrollY * 0.004);
            const rotationZ = -(scrollY * 0.001);

            const positionX = (scrollY * 0.009);
            const positionY = (scrollY * 0.001) - 2;

            const scale3D = (scrollY * 0.005);
            console.log(positionX)
            // Анимация вращения
            if (scrollY >= 100) {
                gsap.to(modelRef.current.rotation, {
                    y: rotationY <= -3 ? -3 : rotationY,
                    z: rotationZ <= -1.5 ? -1.5 : rotationZ,
                });

                // Анимация позиции
                gsap.to(modelRef.current.position, {
                    x: positionX >= 12.5 ? 12.5 : positionX,
                    y: positionY <= -2 ? -2 : positionY,
                });

                gsap.to(modelRef.current.scale, {
                    x: scale3D >= 6 ? 6 : scale3D + 1,
                    y: scale3D >= 6 ? 6 : scale3D + 1,
                    z: scale3D >= 6 ? 6 : scale3D + 1
                })
            } else if (scrollY < 100) {

                gsap.to(modelRef.current.rotation, {
                    y: 0.1,
                    z: 0,
                });

                // Анимация позиции
                gsap.to(modelRef.current.position, {
                    x: 0,
                    y: -2,
                });

                gsap.to(modelRef.current.scale, {
                    x: 1,
                    y: 1,
                    z: 1
                })
            }
        }
    }, [scrollY]);


    return (
        <mesh
            ref={modelRef}
            scale={[1, 1, 1]}
            position={[0, -2, 1]}
            rotation={[0.1, 0, 0]}
        >
            <primitive object={scene} />
        </mesh>
    );
}
