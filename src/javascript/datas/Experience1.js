const splines = {
	enter: [
		new THREE.Vector3(0, 400, 1500),
		new THREE.Vector3( 0, 400, -800)
	],
	chapter1: [
		new THREE.Vector3(0, 400, -1700),
		new THREE.Vector3( 0, 400, -5000)
	],
	betweenChaptersOneTwo: [
		new THREE.Vector3(0, 400, -6300),
		new THREE.Vector3(0, 400, -10000),
	],
	chapter2: [
		new THREE.Vector3(0, 400, -11000),
		new THREE.Vector3( 0, 400, -14000)
	]
}

const keyPoints = {
	enter: [.1, .5],
	chapter1: [.3, .7],
	betweenChaptersOneTwo: [.4],
	chapter2: [.5, .7]
}

export default {
  splines,
	keyPoints
}
