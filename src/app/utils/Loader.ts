import * as THREE from "three";
import {
  DRACOLoader,
  Font,
  FontLoader,
  type GLTF,
  GLTFLoader,
  RGBELoader,
} from "three-stdlib";

class Loader {
  private static instance: Loader;
  private gltfLoader: GLTFLoader;
  private textureLoader: THREE.TextureLoader;
  private loadingManager: THREE.LoadingManager;
  private rgbeLoader: RGBELoader;
  private fontLoader: FontLoader;

  constructor() {
    if (Loader.instance) return Loader.instance;
    Loader.instance = this;

    this.init();
  }

  private init() {
    this.loadingManager = new THREE.LoadingManager();

    // GLTF Loader
    this.gltfLoader = new GLTFLoader();

    // Draco Loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    this.gltfLoader.setDRACOLoader(dracoLoader);

    // Texture Loader
    this.textureLoader = new THREE.TextureLoader();

    // RGBE (HDRI) Loader
    this.rgbeLoader = new RGBELoader();

    // Font Loader
    this.fontLoader = new FontLoader();
  }

  public loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error),
      );
    });
  }

  public loadHDRI(url: string): Promise<THREE.DataTexture> {
    return new Promise((resolve, reject) => {
      this.rgbeLoader.load(
        url,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error),
      );
    });
  }

  public loadFont(url: string): Promise<Font> {
    return new Promise((resolve, reject) => {
      this.fontLoader.load(
        url,
        (font) => resolve(font),
        undefined,
        (error) => reject(error),
      );
    });
  }

  public loadGLTF(url: string): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        url,
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error),
      );
    });
  }
}

export default Loader;
