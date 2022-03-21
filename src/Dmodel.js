/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/dmodel.glb')
  materials['initialShadingGroup.001'].side = 0
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes['169_India_Edited'].geometry} material={materials['initialShadingGroup.001']} />
    </group>
  )
}

useGLTF.preload('/dmodel.glb')