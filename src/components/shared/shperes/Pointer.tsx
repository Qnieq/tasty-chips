import { useFrame } from "@react-three/fiber"
import { BallCollider, RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import * as THREE from 'three'

interface PointerProps {
  vec?: THREE.Vector3 // Тип для вектора
}

export function Pointer({ vec = new THREE.Vector3() }: PointerProps) {
  // Используем реф для компонента RigidBody
  const ref = useRef<any>(null) // тип any для доступа к методам

  useFrame(({ mouse, viewport }) => {
    if (ref.current) {
      // Доступ к методу setNextKinematicTranslation через реф
      ref.current.setNextKinematicTranslation(
        vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
      )
    }
  })

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}
