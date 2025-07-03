import type { Mesh } from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Moon() {
  const moonRef = useRef<Mesh>(null!)
  const xAxis = 4

  useFrame(({ clock }) => {
    moonRef.current.position.x = Math.sin(clock.elapsedTime * 0.2) * xAxis
    moonRef.current.position.z = Math.cos(clock.elapsedTime * 0.2) * xAxis
    moonRef.current.rotation.y += 0.002
  })

  const [texture] = useTexture(['/images/moon.jpg'])

  return (
    <mesh ref={moonRef} dispose={null} position={[xAxis, 0, 0]} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhongMaterial map={texture} />
    </mesh>
  )
}
