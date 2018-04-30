const splines = {
	enter: [
		new THREE.Vector3(0, 600, 2100),
		new THREE.Vector3( 0, 600, 200)
	],
	chapter1: [
		new THREE.Vector3(0, 600, -2000),
		new THREE.Vector3( 0, 600, -5000)
	],
	betweenChaptersOneTwo: [
		new THREE.Vector3(0, 600, -6300),
		new THREE.Vector3(0, 600, -10000),
	],
	chapter2: [
		new THREE.Vector3(0, 600, -11000),
		new THREE.Vector3( 0, 600, -14000)
	],
	betweenChaptersTwoThree: [
		new THREE.Vector3(0, 600, -15300),
		new THREE.Vector3(0, 600, -19000),
	],
	chapter3: [
		new THREE.Vector3(0, 250, -20000),
		new THREE.Vector3( 0, 250, -22900),
		new THREE.Vector3( 5, 250, -22850)
	],
	betweenChaptersThreeConclusion: [
		new THREE.Vector3( 0, 250, -24500),
		new THREE.Vector3( 0, 250, -29000)
	],
	conclusion: [
		new THREE.Vector3(0, 250, -30500),
		new THREE.Vector3(0, 280, -31500),
		new THREE.Vector3(650, 310, -32500),
		new THREE.Vector3( 0, 340, -33000),
		new THREE.Vector3( -650, 370, -32500),
		new THREE.Vector3( 0, 410, -31500),
		new THREE.Vector3( 0, 450, -34000)
	]
}

// TODO: faire en sorte qu'aucun ne soit sauté (quand on va trop vite)
const keyPoints = {
	enter: [.1, .5],
	chapter1: [.2, .7],
	betweenChaptersOneTwo: [.4],
	chapter2: [.5, .7],
	betweenChaptersTwoThree: [],
	chapter3: [.45, .7],
	betweenChaptersThreeConclusion: [],
	conclusion: []
}

const textsPanel =  [
	'La “Dure Marche” : 3 millions de personnes sont décédées à cause de la famine sous le règne de Kim Sung Il, une période surnommé la “Dure Marche”.',
	'Chaque Nord-Coréen recevait 5$ dollars par mois de la part du gouvernement. Un kilo de riz coûtant 3$, un habitant devait se contenter d’à peine deux kilo de riz pour survivre jusqu’à la fin du mois.',
	'Avant 12 ans, il est interdit aux Nord-Coréens d’assister à une exécution publique; après 12 ans, cela devient obligatoire.'
]

const chaptersTitle =  [
	'l\'envers du décor'
]

const conclusions =  [
	['assets/conclusion/video.mp4', 'video'],
	['assets/conclusion/video2.mp4', 'video'],
	['assets/conclusion/video2.mp4', 'video']
]

// number of spline, spline index begining
const timelineIndicators = [
	['CH 1  &nbsp/', 'L\'envers du décors', 2],
	['CH 2  &nbsp/', 'L\'armée protectrice', 2],
	['CH 3  &nbsp/', 'Les classes sociales', 2]
]


export default {
  splines,
	keyPoints,
	textsPanel,
	chaptersTitle,
	conclusions,
	timelineIndicators
}
