import { useFrame } from "@react-three/fiber"
import { BallCollider, RigidBody as RigidBodyComponent, RigidBodyProps } from "@react-three/rapier"
import { RefObject, useMemo, useRef } from "react"
import { easing } from 'maath'
import * as THREE from 'three'

export interface SphereProps extends RigidBodyProps {
  position?: [number, number, number]
  scale?: number
  r?: (value: number) => number
  accent?: boolean
  color?: string
  children?: React.ReactNode
  vec?: THREE.Vector3
  roughness?: number;
  metalness?: number;
  transparent?: boolean;
  opacity?: number;
}

export function Sphere({
  position,
  children,
  vec = new THREE.Vector3(),
  scale = 1,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  color = 'white',
  ...props
}: SphereProps) {
  const api = useRef<any>(null) // Ссылка на объект физики
  const ref = useRef<THREE.Mesh | null>(null)
  
  const pos: [number, number, number] = useMemo(
    () => position || [r(10), r(10), r(10)],
    [position, r]
  )

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    if (api.current) {
      api.current.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
    }
    if (ref.current && ref.current.material) {
      const material = ref.current.material
      // Проверка, является ли material экземпляром MeshStandardMaterial
      if (material instanceof THREE.MeshStandardMaterial) {
        easing.dampC(material.color, new THREE.Color(color), 0.2, delta)
      }
    }
  })

  return (
    <RigidBodyComponent
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[1]} />
      <mesh ref={ref} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial {...props} />
        {children}
      </mesh>
    </RigidBodyComponent>
  )
}
