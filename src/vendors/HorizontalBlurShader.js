import BlurVert from './Hblur.vert'
import BlurFrag from './Hblur.frag'

THREE.HorizontalBlurShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"h": { type: "f", value: 0 }
	},
	vertexShader: BlurVert,
	fragmentShader: BlurFrag
};
