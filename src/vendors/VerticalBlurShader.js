import BlurVert from './Vblur.vert'
import BlurFrag from './Vblur.frag'

THREE.VerticalBlurShader = {
		uniforms: {
			"tDiffuse": { type: "t", value: null },
			"v":        { type: "f", value: 0}
		},
		vertexShader: BlurVert,
		fragmentShader: BlurFrag
	};
