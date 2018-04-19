uniform sampler2D tDiffuse;
uniform float h;
uniform float u_time;
varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

void main() {

	// vec4 sum = vec4( 0.0 );

	// * cnoise(vec3(vUv.x, vUv.y, sum.z)) + u_time / 100.

	float scale = 2.;
	vec2 noiseUv = vec2(vUv * scale);
	noiseUv.x += cos(u_time);
	noiseUv.y += sin(u_time);

	float displacement = snoise2(noiseUv);

	float ratio = cos(u_time) * 0.01;

	vec2 uv = vec2(vUv);
	uv.x += (0.5 - displacement) * ratio * 2.;
	uv.y += (0.5 - displacement) * ratio * 2.;


	vec3 color = texture2D(tDiffuse, uv).rgb;


	color = mix(color, vec3(displacement), 0.02);


	gl_FragColor = vec4(color, 1.);

}