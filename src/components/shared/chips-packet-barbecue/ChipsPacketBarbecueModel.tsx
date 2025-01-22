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

    const [modelPosition, setModelPosition] = useState({
        x: -1.2,
        y: window.innerWidth >= 1440 ? -2.1 : -window.innerWidth / 1440 - 2,
        z: window.innerWidth >= 1440 ? 1 : window.innerWidth / 1440
    })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            if (modelRef.current && scrollY < 100) {

            }
        };

        const handleResize = () => {
            if (modelRef.current) {

                if (scrollY >= 100) setModelPosition((val) => ({ ...val, x: 0 }))

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


        }
    }, [scrollY])


    return (
        <mesh
            ref={modelRef}
            position={[0, -2, 1]}
            rotation={[0.1, 0, 0]}
        >
            <primitive object={scene} />
        </mesh>
    );
}
