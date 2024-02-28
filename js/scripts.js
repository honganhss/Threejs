import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ObjectLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import download from "../img/pexels-photo-1169754.jpeg";
import anh2 from "../img/download.jpg";

const model3d = new URL("../scene.gltf", import.meta.url);

const renderer = new THREE.WebGLRenderer();
// tạo ra đối tượng mới dùng webGL để vẽ đồ họa (chịu trách nhiệm vẽ hình ảnh 3D lên màn hình)
renderer.shadowMap.enabled = true;
//bật chức năng ánh sáng đổ bóng (render sẽ tính toán và vẽ bóng cho đối tượng)

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("3D").appendChild(renderer.domElement);
//thêm phần tử dom được tạo bởi render vào phần body

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Tạo lớp điều khiển quỹ đạo
const orbit = new OrbitControls(camera, renderer.domElement);
// thêm điều khiển chuột và cảm ứng vào camera, (xoay, phóng to, thu nhỏ và di chuyển cam)
// camera: đối tượng cam muốn thêm điều khiển vào
//renderer.domElement: Phần tử DOM mà OrbitControls sẽ lắng nghe các sự kiện chuột và cảm ứng.
// Thông thường, điều này sẽ là phần tử DOM được tạo ra bởi renderer

//Tạo đối tượng giúp vẽ trục tọa độ trong không gian 3D
//Tham số truyền vào là 5 la độ dài của các đường trục tọa độ
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
camera.position.set(-10, 30, 3);
orbit.update();

//Tạo hình hộp trong không gian 3D Mặc định kích thước 1x1x1
const boxGeometry = new THREE.BoxGeometry();

// là vật liệu cơ bản với màu xanh lá cây
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

//Kết hơpk geometry và material để tạo thành một đối tượng 3D hoàn chỉnh
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const girdHelper = new THREE.GridHelper(30);
scene.add(girdHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionLight);
directionLight.position.set(-30, 50, 0);
directionLight.castShadow = true;
directionLight.shadow.camera.bottom = -12;

const dLightHelper = new THREE.DirectionalLightHelper(directionLight, 5);
scene.add(dLightHelper);

scene.fog = new THREE.FogExp2(0xffea00, 0.01);
renderer.setClearColor(0xffea00);

const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(download);
const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.load([
//   download,
//   download,
//   download,
//   download,
//   download,
//   download,
// ]);
const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  map: textureLoader.load(download),
});
const box2 = new THREE.Mesh(box2Geometry, box2Material);
scene.add(box2);
box2.position.set(0, 15, 10);
const modelLoader = new THREE.ObjectLoader();
modelLoader.load(model3d.href, function (obj) {
  scene.add(obj);
});
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

// Gọi hàm render
render();

var loader = new THREE.ObjectLoader();
loader.load("access/scene.gltf", function (obj) {
  scene.add(obj);
});

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
};
gui.addColor(options, "sphereColor").onChange(function (e) {
  sphere.material.color.set(e);
});
gui.add(options, "wireframe").onChange(function (e) {
  sphere.material.wireframe = e;
});
gui.add(options, "speed", 0, 0.1);

let step = 0;

function animate(time) {
  //Phép quay
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
