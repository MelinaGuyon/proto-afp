const splines = {
	enter: [
		new THREE.Vector3(0, 400, 1500),
		new THREE.Vector3( 0, 400, -500)
	],
	chapter1: [
		new THREE.Vector3(0, 400, -1700),
		new THREE.Vector3( 0, 400, -2200)
	],
	betweenChaptersOneTwo: [
		new THREE.Vector3(0, 400, -3500),
		new THREE.Vector3(0, 400, -6000),
	],
	chapter2: [
		new THREE.Vector3(0, 400, -7200),
		new THREE.Vector3( 0, 400, -7700)
	]
}

const keyPoints = {
	enter: [.2, .6],
	chapter1: [.5, .7],
	betweenChaptersOneTwo: [.5],
	chapter2: [.65, .85]
}

export default {
  splines,
	keyPoints
}
