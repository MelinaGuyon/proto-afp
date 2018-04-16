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

const textsPanel =  [
	'La “Dure Marche” : 3 millions de personnes sont décédées à cause de la famine sous le règne de Kim Sung Il, une période surnommé la “Dure Marche”.',
	'Chaque Nord-Coréen recevait 5$ dollars par mois de la part du gouvernement. Un kilo de riz coûtant 3$, un habitant devait se contenter d’à peine deux kilo de riz pour survivre jusqu’à la fin du mois.',
	'Avant 12 ans, il est interdit aux Nord-Coréens d’assister à une exécution publique; après 12 ans, cela devient obligatoire.'
]

export default {
  splines,
	keyPoints,
	textsPanel
}
