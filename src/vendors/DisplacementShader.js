import BlurVert from 'glsl/Displacement.vert'
import BlurFrag from 'glsl/Displacement.frag'

THREE.Displacement = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		'u_time': { type: 'f', value: 0 },
		'u_ratio': { type: 'f', value: 0. },
		'u_resolution': { type: "v2", value: new THREE.Vector2(1024, 768) }
	},
	vertexShader: BlurVert,
	fragmentShader: BlurFrag
};
