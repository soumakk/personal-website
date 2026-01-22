import { PerspectiveCamera, WebGLRenderer } from "three";
import { OrbitControls } from "three-stdlib";

class Camera {
  private fov = 80;
  private aspect = window.innerWidth / window.innerHeight;
  camera: PerspectiveCamera;
  orbit: OrbitControls;

  constructor() {}

  init(renderer: WebGLRenderer) {
    this.camera = new PerspectiveCamera(this.fov, this.aspect);
    this.camera.position.set(0, 0, 4);

    this.orbit = new OrbitControls(this.camera, renderer.domElement);
    this.orbit.enableDamping = true;
    this.orbit.enabled = false;
  }

  get instance() {
    return this.camera;
  }

  update() {
    this.orbit.update();
  }

  onResize() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  }
}

export default Camera;
