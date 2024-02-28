import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);
// box.position.set(0, 0, 0);
camera.position.set(0, 0, 5);
renderer.setClearColor(0xffea00);
let mesh;
var path = window.location.origin + "/access/shiba/scene.gltf";
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader().setPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);
console.log(path);
loader.load(
  path,
  function (gltf) {
    var model = gltf.scene;
    model.position.set(0, 1.05, -1);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  renderer.render(scene, camera);
  orbit.update();
  requestAnimationFrame(animate);
}

animate();
document.getElementById("3D").appendChild(renderer.domElement);
// // const scene = new THREE.Scene();
// // const camera = new THREE.PerspectiveCamera(
// //   75,
// //   window.innerWidth / window.innerHeight,
// //   0.1,
// //   1000
// // );

// // let obj;
// // let controls;
// // let objToRender = "3dModul";
// // const loader = new GLTFLoader();

// // loader.load(
// //   "src/access/scene.gltf",
// //   function (gltf) {
// //     obj = gltf.scene;
// //     scene.add(obj);
// //   },
// //   function (xhr) {
// //     console.log((xhr.loaded / xhr.total) * 100 + "% loader");
// //   },
// //   function (error) {
// //     console.log(error);
// //   }
// // );

// // const renderer = new THREE.WebGLRenderer({ alpha: true });
// // renderer.setSize(window.innerWidth, window.innerHeight);

// // document.getElementById("3D").appendChild(renderer.domElement);

// // const topLight = new THREE.DirectionalLight(0xffffff, 1);
// // topLight.position.set(500, 500, 500);
// // topLight.castShadow = true;
// // scene.add(topLight);
// // const ambientLight = new THREE.AmbientLight(
// //   0x333333,
// //   objToRender === "dino" ? 5 : 1
// // );
// // scene.add(ambientLight);

// // function animate() {
// //   requestAnimationFrame(animate);
// // }
// // window.addEventListener("resize", function () {
// //   camera.aspect = this.window.innerWidth / this.window.innerHeight;
// //   camera.updateProjectionMatrix();
// //   renderer.setSize(this.window.innerWidth, this.window.innerHeight);
// // });
// // animate();

// let scene;
// function intit() {
//   scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xdddddd);
//   camera = new THREE.PerspectiveCamera(
//     40,
//     window.innerWidth / window.innerHeight,
//     1,
//     5000
//   );
//   hlight = new THREE.AmbientLight(0x404040, 100);
//   scene.add(hlight);
//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.getElementById("3D").appendChild(renderer.domElement);

//   let loader = new GLTFLoader();
//   loader.load("./src/scene.gltf", function (gltf) {
//     scene.add(gltf.scene);
//     renderer.render(scene, camera);
//   });
// }
// intit();
