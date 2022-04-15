import React, {  useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Content() {
  const ref = useRef()

  return (
    <div ref={ref} className="content">
      <section className="section-one">
        <h1>SECTION 1</h1>
      </section>
      <section className="section-two">
        <h1>SECTION 2</h1>
      </section>
    </div>
  )
}

export default Content
