const splines = {
	enter: [
		new THREE.Vector3(0, 600, 2100),
		new THREE.Vector3( 0, 600, -200)
	],
	chapter1: [
		new THREE.Vector3(0, 150, -2800),
		new THREE.Vector3( 0, 150, -5000)
	],
	betweenChaptersOneTwo: [
		new THREE.Vector3(0, 600, -6300),
		new THREE.Vector3(0, 600, -10000),
	],
	chapter2: [
		new THREE.Vector3(0, 250, -11000),
		new THREE.Vector3( 0, 250, -12500),
		new THREE.Vector3( 900, 250, -12500),
		new THREE.Vector3( 900, 250, -14500),
		new THREE.Vector3( 300, 250, -14600),
		new THREE.Vector3( 0, 250, -14800),
		new THREE.Vector3( 0, 250, -15300)
	],
	betweenChaptersTwoThree: [
		new THREE.Vector3(0, 600, -16000),
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

const keyPoints = {
	enter: [.2, .4, .7],
	chapter1: [.1, .5, .7],
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

const subtitles = [
	[
		['Je m’appelle Min-Ho, je suis Nord-Coréen.', 0],
		['J’ai fui mon pays natal à 16 ans, et lui étais', 3000],
		['jusqu’alors toujours resté fidèle.', 5500],
		['Il était pour moi le meilleur pays au monde,', 8000],
		['car je ne connaissais rien d’autre.', 9500]
	],
	[
		['J’ai évolué jour après jour dans un monde artificiel,', 0],
		['dont les valeurs ne sont qu’une façade.', 4000]
	]
]

const voiceOver = [
	'assets/sound/Audio1.wav',
	'assets/sound/Audio2.wav'
]


export default {
  splines,
	keyPoints,
	textsPanel,
	subtitles,
	voiceOver,
	chaptersTitle,
	conclusions,
	timelineIndicators
}
