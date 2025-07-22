'use client'

import type { DirectionalLight } from 'three'
import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { Color, DirectionalLightHelper } from 'three'

export function DirectionalLights() {
  const directionalLightRef1 = useRef<DirectionalLight>(null!)
  const directionalLightRef2 = useRef<DirectionalLight>(null!)

  useHelper(directionalLightRef1, DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRef2, DirectionalLightHelper, 1, 'hotpink')

  return (
    <>
      <directionalLight
        ref={directionalLightRef1}
        color={Color.NAMES.aliceblue}
        intensity={3}
        position={[0, 0, 10]}
        castShadow
      />
      <directionalLight ref={directionalLightRef2} position={[0, 0, -10]} castShadow />
    </>
  )
}
