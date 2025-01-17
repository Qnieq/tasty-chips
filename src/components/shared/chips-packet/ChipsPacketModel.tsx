import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

interface IChipsPacketModel {
    url: string;
    scrollY: number;
}

export function ChipsPacketModel({ url, scrollY }: IChipsPacketModel) {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            if (modelRef.current && scrollY < 100) {

                gsap.to(modelRef.current.rotation, {
                    x: y * -0.1,
                    y: x * 0.1,
                    duration: 1.5,
                    ease: "power1.out",
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [scrollY]);

    useEffect(() => {
        if (modelRef.current && scrollY >= 100) {

            if (scrollY / 500 <= 6.3) {
                gsap.to(modelRef.current.rotation, {
                    x: 0.1,
                    y: scrollY / 500,
                    z: 0,
                    duration: 1.5,
                    ease: "power1.out",
                });
            }

            gsap.to(modelRef.current.position, {
                x: 0,
                y: -2.1,
                z: 1,
                duration: 1.5,
                ease: "power1.out",
            });

        } else if (modelRef.current) {
            gsap.to(modelRef.current.rotation, {
                x: 0.1,
                y: 0,
                z: -0.35,
                duration: 1.5,
                delay: 0,
                ease: "power1.out",
            });

            gsap.to(modelRef.current.position, {
                x: -1.2,
                y: -2.1,
                z: 1,
                duration: 1.5,
                ease: "power1.out",
            });
        }

    }, [scrollY])


    return (
        <mesh
            ref={modelRef}
            position={[-1.2, -2.1, 1]}
            rotation={[0.1, 0, -0.35]}
        >
            <primitive object={scene} />
        </mesh>
    );
}
