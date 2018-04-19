uniform sampler2D tDiffuse;
uniform float u_time;
uniform float u_ratio;
varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

void main() {
	
	// change displacement size
	float scale = 2.;
	vec2 noiseUv = vec2(vUv * scale);
	// fait en sorte de faire tourner l'effet
	noiseUv.x += cos(u_time);
	noiseUv.y += sin(u_time);

	float displacement = snoise2(noiseUv);
	
	// Fait que ça oscille
	//  et que l'animation se fait puis se stop un peu
	// float ratio = sin(u_time) * 0.05; 
	float ratio = u_ratio; // no stop

	// 0.5 pour remapper l'espace et que 
	// l'animation se fasse partout de la même façon
	vec2 uv = vec2(vUv);
	uv.x += (0.5 - displacement) * ratio * 2.;
	uv.y += (0.5 - displacement) * ratio * 2.;


	vec3 color = texture2D(tDiffuse, uv).rgb;

	color = mix(color, vec3(displacement), 0.);

	gl_FragColor = vec4(color, 1.);

}