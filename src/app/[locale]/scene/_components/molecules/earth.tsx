import type { Mesh } from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Earth() {
  const earthRef = useRef<Mesh>(null!)

  useFrame(() => {
    earthRef.current.rotation.y += 0.001
  })

  const [texture, normalTexture, specularTexture] = useTexture([
    '/images/models/earth.jpg',
    '/images/models/earth-normal.jpg',
    '/images/models/earth-specular.jpg',
    // '/images/models/earth-displacement.jpg',
  ])

  return (
    <mesh ref={earthRef} dispose={null} receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        // displacementMap={displacementTexture}
        // displacementScale={0.1}
        map={texture}
        normalMap={normalTexture}
        shininess={100}
        specularMap={specularTexture}
      />
      {/*<meshStandardMaterial map={texture} normalMap={normalTexture} />*/}
    </mesh>
  )
}
