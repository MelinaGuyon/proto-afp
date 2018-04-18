varying vec2 vUv;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}