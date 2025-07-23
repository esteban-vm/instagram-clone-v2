'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { Color } from 'three'
import { Atoms, Molecules } from '@/app/[locale]/scene/_components'

export function SolarSystem() {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1_000, position: [0, 3, 3] }}
      className='container mx-auto !h-screen cursor-grab active:cursor-grabbing'
      shadows
    >
      <Perf />
      <OrbitControls
        // autoRotateSpeed={-0.5}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        // autoRotate
      />
      <color args={[Color.NAMES.black]} attach='background' />
      <Atoms.AnimatedStars />
      {/* <DirectionalLights /> */}
      {/* <ambientLight intensity={3} /> */}
      {/* <spotLight intensity={3} /> */}
      <directionalLight intensity={10} position={[0, 10, 0]} castShadow />
      <group position={[0, -1, 0]}>
        <Molecules.Earth />
        {/* <Molecules.ISS /> */}
        <Molecules.Moon />
      </group>
    </Canvas>
  )
}
