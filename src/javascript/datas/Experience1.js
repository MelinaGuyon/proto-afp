const splines = {
	enter: [
		new THREE.Vector3(0, 400, 1500),
		new THREE.Vector3(0, 400, 900),
		new THREE.Vector3( 0, 400, -500)
	],
	chapter1: [
		new THREE.Vector3(0, 400, -1200),
		new THREE.Vector3(0, 400, -3000),
		new THREE.Vector3( 0, 400, -6500)
	],
	chapter2: [
		new THREE.Vector3(0, 400, -7200),
		new THREE.Vector3( 0, 400, -7600),
		new THREE.Vector3( 0, 400, -7700)
	]
}

const keyPoints = {
	enter: [.4, .7],
	chapter1: [],
	chapter2: []
}

export default {
  splines,
	keyPoints
}
