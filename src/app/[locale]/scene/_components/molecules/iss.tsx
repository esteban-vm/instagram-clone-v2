import type { Mesh } from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

export function ISS() {
  const issRef = useRef<Mesh>(null!)
  const issModel = useGLTF('/models/ISS/ISS_stationary.gltf')
  const issObject = useMemo(() => issModel, [issModel])
  const xAxis = 2

  useFrame(({ clock }) => {
    issRef.current.position.x = Math.sin(clock.elapsedTime * 0.2) * xAxis
    issRef.current.position.z = Math.cos(clock.elapsedTime * 0.2) * xAxis
  })

  return (
    <mesh ref={issRef} dispose={null} position={[xAxis, 0, 0]} castShadow>
      <primitive object={issObject.scene} scale={0.005} />
    </mesh>
  )
}
