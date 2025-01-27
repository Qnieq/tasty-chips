import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export function ChipsPacketBarbecueLightOpen() {
    const lightRef = useRef<THREE.DirectionalLight | null>(null);

    useFrame(({ camera }) => {
        if (lightRef.current) {
            lightRef.current.position.copy(camera.position)
        }
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                ref={lightRef}
                intensity={10}
            />
        </>
    )
}
