import Stats from "stats.js";
import * as THREE from "three";

class Renderer {
  renderer: THREE.WebGLRenderer;
  stats: Stats;

  constructor() {}

  init(root: HTMLDivElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.setClearColor("#151515");

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    root.appendChild(this.renderer.domElement);

    // Stats.js
    // this.stats = new Stats()
    // root.appendChild(this.stats.dom)
  }

  get instance() {
    return this.renderer;
  }

  update = (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
    this.renderer.render(scene, camera);
    // this.stats.update();
  };

  onKeydown = (event: KeyboardEvent): void => {
    // Fullscreen toggle: Ctrl + Space
    if (event.ctrlKey && event.code === "Space") {
      event.preventDefault();
      if (!document.fullscreenElement) {
        this.renderer.domElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      return;
    }
  };

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

export default Renderer;
