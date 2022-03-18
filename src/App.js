import React, { useRef, useState, Suspense, state, useEffect } from 'react'
import { Canvas, useFrame, useLoader, Vector3 } from '@react-three/fiber'
import * as THREE from "three";
import Model from './Model'



function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

var trackCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(4.26, 1.17, 12.29),
  new THREE.Vector3(0.5, 1.05, 7.94),
  new THREE.Vector3(0, 1, 2.27),
  new THREE.Vector3(0, 2, -10),
], false, "centripetal");

var camPosIndex = 1;
var scrollDist = 0;
//var target = [0,0,0]

function Dolly() {
  useFrame((state) => {
    camPosIndex = THREE.MathUtils.lerp(camPosIndex, scrollDist * 30, 0.05);
    const camPos = trackCurve.getPoint(camPosIndex / 1000)
    //state.camera.position.z = 40 + Math.sin(state.clock.getElapsedTime()) * 20
    state.camera.position.set(camPos.x, camPos.y, camPos.z)
    state.camera.lookAt(4,0,0)
    state.camera.updateProjectionMatrix()
  })
  return null
}

export default function App() {
  return (
    <Canvas>
      <Suspense fallback='null'>
        <Model position={[-1.2, 0, 0]} onWheel={(e) => scrollDist+=0.2} />
      </Suspense>
      <Dolly/>
    </Canvas>
  )
}
