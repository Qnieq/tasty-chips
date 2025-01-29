import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

interface IChipsPacketModel {
    url: string;
    scrollY: number;
}

export function ChipsPacketOnionModel({ url, scrollY }: IChipsPacketModel) {
    const { scene } = useGLTF(url);

    const modelRef = useRef<THREE.Mesh>(null);

    const [modelPosition, setModelPosition] = useState({
        x: window.innerWidth >= 1440 ? -1.2 : -window.innerWidth / 1440 - 0.5,
        y: window.innerWidth >= 1440 ? -2.1 : -window.innerWidth / 1440 - 2,
        z: window.innerWidth >= 1440 ? 1 : (window.innerWidth / 1440) - 0.1
    })

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

        const handleResize = () => {
            if (modelRef.current) {

                if (scrollY >= 100) setModelPosition((val) => ({ ...val, x: 0 }))

                gsap.to(modelRef.current.position, {
                    x: modelPosition.x,
                    y: modelPosition.y,
                    z: modelPosition.z,
                    duration: 0.5,
                    ease: "power1.out",
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, [scrollY]);

    useEffect(() => {
        if (modelRef.current && scrollY >= 100) {

            const formula_rotation = (((Math.PI * 2) * scrollY - 100) / (((window.innerHeight / 2) * 3 + 868) - 100 - 20)) / 0.70

            if (formula_rotation <= Math.PI * 2) {

                gsap.to(modelRef.current.rotation, {
                    x: 0.1,
                    y: formula_rotation,
                    z: 0,
                    duration: 1.5,
                    ease: "power1.out",
                });
            }

            setModelPosition((val) => ({ ...val, x: 0 }))

            gsap.to(modelRef.current.position, {
                x: 0,
                y: -2.1,
                z: modelPosition.z,
                duration: 1.5,
                ease: "power1.out",
            });

        } else if (modelRef.current && scrollY < 100) {
            gsap.to(modelRef.current.rotation, {
                x: 0.1,
                y: 0,
                z: -0.35,
                duration: 1.5,
                ease: "power1.out",
            });

            setModelPosition((val) => ({ ...val, x: window.innerWidth >= 1440 ? -1.2 : -window.innerWidth / 1440 - 0.5, y: -2.1 }))

            gsap.to(modelRef.current.position, {
                x: modelPosition.x,
                y: modelPosition.y,
                z: modelPosition.z,
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
