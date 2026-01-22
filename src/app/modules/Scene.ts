import * as THREE from "three";
import Clock from "../utils/Clock";
import Loader from "../utils/Loader";

import vertexShader from "../shaders/demo.vert";
import fragmentShader from "../shaders/demo.frag";
import { FontLoader, TextGeometry } from "three-stdlib";
import { random } from "../utils/helpers";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";

class Scene {
  scene: THREE.Scene;
  private clock: Clock;
  private loader: Loader;
  plane: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.ShaderMaterial,
    THREE.Object3DEventMap
  >;
  cursor: THREE.Vector2;
  camera: THREE.PerspectiveCamera;
  boxes: THREE.Group<THREE.Object3DEventMap>;

  constructor() {
    this.clock = new Clock();
    this.loader = new Loader();
    this.cursor = new THREE.Vector2();
  }

  init(camera: THREE.PerspectiveCamera) {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.camera = camera;

    this.addParticles();
    this.addBoxes();
    this.addText("Soumak", 1, new THREE.Vector3(0, 0.6, 0));
    this.addText("Dutta", 1, new THREE.Vector3(0, -0.6, 0));
    // this.addText("Creative Developer", 0.3, new THREE.Vector3(0, -1, 0));
  }

  addParticles() {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3 + 0] = random(-10, 10);
      positions[i3 + 1] = random(-10, 10);
      positions[i3 + 2] = random(-10, 10);
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particlesMat = new THREE.PointsMaterial({
      size: 0.1,
      // sizeAttenuation: true,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    this.scene.add(particles);
  }

  addBoxes() {
    const count = 100;
    this.boxes = new THREE.Group();
    this.scene.add(this.boxes);

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    for (let i = 0; i < count; i++) {
      const box = boxMesh.clone();
      box.position.x = random(-10, 10);
      box.position.y = random(-10, 10);
      box.position.z = random(-10, 10);

      box.rotation.x = Math.PI * 2 * Math.random();
      box.rotation.y = Math.PI * 2 * Math.random();
      box.rotation.z = Math.PI * 2 * Math.random();

      box.scale.setScalar(random(0.3, 0.6));

      this.boxes.add(box);
    }
  }

  async addText(text: string, size = 1, position: THREE.Vector3) {
    const font = await this.loader.loadFont("/fonts/Audiowide_Regular.json");
    const textGeometry = new TextGeometry(text, {
      font,
      size: size,
      height: 0.4,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      // bevelSegments: 5,
    });
    textGeometry.center();
    const textMaterial = new THREE.MeshNormalMaterial({ wireframe: false });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.copy(position);
    this.scene.add(textMesh);
  }

  async addLights() {
    // Add hdri env
    const envTexture = await this.loader.loadHDRI(
      "/hdri/cyclorama_hard_light_2k.hdr",
    );
    envTexture.mapping = THREE.EquirectangularRefractionMapping;
    this.scene.background = envTexture;
    this.scene.environment = envTexture;
  }

  get instance() {
    return this.scene;
  }

  onMouseMove(event: MouseEvent) {
    this.cursor.x = event.clientX / window.innerWidth - 0.5;
    this.cursor.y = -(event.clientY / window.innerHeight - 0.5);
  }

  update() {
    this.camera.position.lerp(
      new THREE.Vector3(this.cursor.x * 5, this.cursor.y * 5, 4),
      0.02,
    );

    this.boxes.children.forEach((box) => {
      box.rotation.x += this.clock.delta * 0.1;
      box.rotation.y += this.clock.delta * 0.1;
      box.rotation.z += this.clock.delta * 0.1;
    });
  }
}

export default Scene;
