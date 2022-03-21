import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import Model from './Dmodel.tsx'

const trackCurve: THREE.CatmullRomCurve3 = new THREE.CatmullRomCurve3([
  new THREE.Vector3(4.26, 1.17, 12.29),
  new THREE.Vector3(0.5, 1.05, 7.94),
  new THREE.Vector3(0, 1, 2.27),
  new THREE.Vector3(0, 2, -10),
], false, "centripetal");

var camPosIndex: number = 0;
var scrollDist: number = 0;

function Dolly() {
  useFrame((state) => {
    camPosIndex = THREE.MathUtils.lerp(camPosIndex, scrollDist * 30, 0.05);
    const camPos: THREE.Vector3 = trackCurve.getPoint(camPosIndex / 1000)
    state.camera.position.set(camPos.x, camPos.y, camPos.z)
    state.camera.lookAt(4, 0, 0)
    state.camera.updateProjectionMatrix()
  })
  return null
}


export default function App() {
  const scrollArea = useRef();

  function onScroll(e) {
    e = e.deltaY / 400
    scrollDist += e
    scrollDist = THREE.MathUtils.clamp(scrollDist, 0, 100)
    if (isNaN(scrollDist)) {
      scrollDist = 0
    }
  }

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <span onWheel={onScroll}>
      <Canvas>
        <Suspense fallback='null'>
          <Model position={[0, 0, 0]} />
        </Suspense>
        <Dolly />
      </Canvas>
    </span>
  )
}
