import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export default class App extends Component {
  componentDidMount() {

    var camPosIndex = 1;
    var scrollDist = 0;

    var scene = new THREE.Scene();
    scene.background = new THREE.Color('white')
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var trackCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(4.26, 1.17, 12.29),
      new THREE.Vector3(0.5, 1.05, 7.94),
      new THREE.Vector3(0, 1, 2.27),
      new THREE.Vector3(0, 2, -10),
    ], false, "centripetal");

    var target = new THREE.Vector3(4, 0, 0)

    const loader = new GLTFLoader();
    loader.load(
      // resource URL
      'indiast.glb',
      // called when the resource is loaded
      function (gltf) {
        gltf.scene.children[0].material.side = THREE.FrontSide
        console.log(gltf.scene.children[0].material)
        scene.add(gltf.scene);
        
      })
   
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame(animate);
      scrollDist += 0.02
      camPosIndex = THREE.MathUtils.lerp(camPosIndex, scrollDist * 30, 0.05);
      const camPos = trackCurve.getPoint(camPosIndex / 1000)
      camera.position.set(camPos.x, camPos.y, camPos.z)
      camera.lookAt(target)

      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    animate();

  }
  render() {
    return (
      <div />
    )
  }
}
const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);