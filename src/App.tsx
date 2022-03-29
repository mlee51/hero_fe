import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import Model from './Dmodel'

const trackCurve: THREE.CatmullRomCurve3 = new THREE.CatmullRomCurve3([
  new THREE.Vector3(10.26, 3.17, 8.29),
  new THREE.Vector3(-5, 4.17, 4),
  new THREE.Vector3(-3, 10, 1),
  new THREE.Vector3(0, 5, 0),
  new THREE.Vector3(1.2, 1, 0),
], false, "catmullrom", 0.6);

var camPosIndex: number = 0;
var scrollDist: number = 0;

function Dolly() {
  useFrame((state) => {
    camPosIndex = THREE.MathUtils.lerp(camPosIndex, scrollDist * 30, 0.05);
    const camPos: THREE.Vector3 = trackCurve.getPoint(camPosIndex / 1000)
    state.camera.position.set(camPos.x, camPos.y, camPos.z)
    state.camera.lookAt(3, 0, 0)
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
      <Canvas  gl={{ antialias: false }} dpr={window.devicePixelRatio}>
        <Suspense fallback='null'>
          <Model position={[1.5, 0, 0]} />
        </Suspense>
        <Dolly />
      </Canvas>
    </span>
  )
}
