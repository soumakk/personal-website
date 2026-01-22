#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

uniform float uTime;

varying vec2 vUv;

void main() {
    
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
