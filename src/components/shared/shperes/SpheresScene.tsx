import { Canvas, CanvasProps } from "@react-three/fiber"
import { Pointer } from "./Pointer"
import * as THREE from 'three'
import { Environment, Lightformer } from "@react-three/drei"
import { Sphere, SphereProps } from "./Sphere"
import { useMemo, useReducer } from "react"
import { shuffle } from "gsap"
import { Physics } from "@react-three/rapier"

interface SpheresSceneProps extends CanvasProps {
  // Дополнительные пропсы, если необходимо
}



export function SpheresScene(props: SpheresSceneProps) {
  const accents = ['white'] // Пример возможных акцентов, можно расширить
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)

  const shuffle = (accent = 0): SphereProps[] => [
    { color: '', opacity: 0.21, transparent: true},
    { color: '', opacity: 0.63, transparent: true},
    { color: '', opacity: 0.76, transparent: true},
    { color: '', opacity: 0.5, transparent: true},
    { color: '', opacity: 0.28, transparent: true},
    { color: '', opacity: 0.83, transparent: true},
    { color: '', opacity: 0.9, transparent: true},
    { color: '', opacity: 0.73, transparent: true},
    { color: '', opacity: 0.53, transparent: true},
    { color: '', opacity: 0.93, transparent: true},  

  ];
  // Типизируем connectors как массив объектов с нужными пропсами для Sphere
  const connectors = useMemo<SphereProps[]>(() => shuffle(accent), [accent]);

  return (
    <Canvas
      flat
      shadows
      onClick={click}
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 40 }}
      {...props}
    >
      <color attach="background" args={['#000']} />
      <Physics /*debug*/ timeStep="vary" gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => (
          <Sphere key={i} {...props} />
        ))}
      </Physics>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          {/* <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} /> */}
          {/* <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} /> */}
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          <Lightformer form="ring" color="#fff" intensity={100} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
        </group>
      </Environment>
    </Canvas>
  )
}
