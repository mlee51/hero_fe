import React, { useRef, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap, { Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import * as THREE from "three";
import Model from './Dmodel'
import Content from './Content'

const trackCurve: THREE.CatmullRomCurve3 = new THREE.CatmullRomCurve3([
  new THREE.Vector3(10.26, 3.17, 8.29),
  new THREE.Vector3(-5, 4.17, 4),
  new THREE.Vector3(-3, 10, 1),
  new THREE.Vector3(0, 5, 0),
  new THREE.Vector3(1.2, 1, 0),
], false, "catmullrom", 0.6);

var camPosIndex: number = 0;
var scrollDist: number = 0;

var _scrollDist = {
  value: 0
}

function Dolly() {
  useFrame((state) => {
    camPosIndex = THREE.MathUtils.lerp(camPosIndex, _scrollDist.value * 30, 0.05);
    const camPos: THREE.Vector3 = trackCurve.getPoint(camPosIndex / 1000)
    state.camera.position.set(camPos.x, camPos.y, camPos.z)
    state.camera.lookAt(3, 0, 0)
    state.camera.updateProjectionMatrix()
  })
  return null
}


export default function App() {
  const [main, setMain] = useState()
  var tubePerc = {
    percent: 0
  }

  gsap.registerPlugin(ScrollTrigger)



  const ref = useRef()

  function onScroll(e) {/*
    e = e.deltaY / 400
    scrollDist += e
    scrollDist = THREE.MathUtils.clamp(scrollDist, 0, 100)
    if (isNaN(scrollDist)) {
      scrollDist = 0
    }*/
  }

  //useEffect(() => void onScroll({ target: scrollArea.current }), []);
  useEffect(() => {
    setMain(ref.current.children[1])
  }, [main])

  return (
    <main ref={ref}>
     <div className="canvas3D">
        <Canvas3D mainRef={main} />
      </div>
      <Content />
    </main>
  )
}

function Canvas3D({ mainRef }) {
  let animable = {
    x: -3,
    y: -3
  }

  useEffect(() => {
    if (mainRef) {
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-one',
          start: 'top top',
          endTrigger: '.section-two',
          end: 'bottom bottom',
          snap: 1,
          scrub: 1,
          markers: true
        }
      })
      tl1.to(_scrollDist, {
        value: 3
      })
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-two',
          start: 'top top',
          endTrigger: '.section-three',
          end: 'bottom bottom',
          markers: true,
          scrub: 1
        }
      })
      tl3.to(_scrollDist, {
        value: 3
      })
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-three',
          start: 'top top',
          endTrigger: '.section-four',
          end: 'bottom bottom',
          markers: true,
          scrub: 1
        }
      })
      tl2.to(_scrollDist, {
        value: -3
      })
    }
  }, [mainRef])
  return (
    <Canvas gl={{ antialias: false }} dpr={window.devicePixelRatio}>
      <Suspense fallback='null'>
        <Model position={[1.5, 0, 0]} />
      </Suspense>
      <Dolly />
    </Canvas>
  )
}

