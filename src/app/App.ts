import E from "@unseenco/e";
import Camera from "./modules/Camera";
import Renderer from "./modules/Renderer";
import Scene from "./modules/Scene";
import Clock from "./utils/Clock";

class App {
  static instance: App;
  scene: Scene;
  renderer: Renderer;
  camera: Camera;
  clock: Clock;

  constructor() {
    // Singleton
    if (App.instance) return App.instance;
    App.instance = this;

    this.scene = new Scene();
    this.renderer = new Renderer();
    this.camera = new Camera();
  }

  init = (root: HTMLDivElement) => {
    this.renderer.init(root);
    this.camera.init(this.renderer.instance);
    this.scene.init(this.camera.instance);

    this.animate();

    // Add event listeners
    E.on("resize", window, this.onResize);
    E.on("keydown", window, this.onKeydown);
    E.on("mousemove", window, this.onMouseMove);
  };

  animate = () => {
    E.emit("update");
    this.scene.update();
    this.camera.update();
    this.renderer.update(this.scene.instance, this.camera.instance);
    requestAnimationFrame(this.animate);
  };

  onResize = () => {
    this.renderer.onResize();
    this.camera.onResize();
  };

  onKeydown = (event: KeyboardEvent): void => {
    this.renderer.onKeydown(event);
  };

  onMouseMove = (event: MouseEvent) => {
    this.scene.onMouseMove(event);
  };
}

export default new App();
