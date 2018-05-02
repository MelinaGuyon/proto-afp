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

const actus = [
	{
		media: 'assets/actusAFP/photo.png',
		title: 'Couvrir le royaume de l\'absurde',
		text: 'Quel est le plus vraisemblable des articles parus dans la presse ces derniers jours à propos du jeune dirigeant nord-coréen Kim Jong-Un? Qu\'il a exécuté son oncle en le livrant nu à une meute de chiens affamés ? Ou qu\'il a fêté son anniversaire à Pyongyang avec une ancienne star du basket américain, réputée pour ses tatouages, ses piercings et son goût pour le déguisement et le catch ? <br></br> Démêler le vrai du faux à propos de la Corée du Nord est une tâche ardue: dans ce pays secret et isolé, dirigé d\'une main de fer depuis trois générations par les Kim, les rumeurs les plus surréalistes paraissent presque crédibles, explique Jung Ha-Won, journaliste au bureau de l\'AFP à Séoul.',
	},
	{
		media: 'assets/actusAFP/photo2.png',
		title: 'visage de pyongyang',
		text: 'Depuis que l\'AFP a ouvert un bureau à Pyongyang en septembre, le photographe Ed Jones, basé à Séoul au sud, a réfléchi aux différentes façons de sortir des images stéréotypées de la Corée du Nord, que ce soit une parade militaire ou la photo volée de passants depuis un bus. </br></br> "L’idée d’une série de portraits semblait la bonne", écrit-il, "car elle impliquait les sujets eux-mêmes. Cette implication peut s’avérer problématique en Corée du nord, à cause de la méfiance innée envers les médias étrangers".',
	},
	{
		media: 'assets/actusAFP/photo3.png',
		title: 'Le photographe face au défilé de masse',
		text: 'Un défilé militaire en Corée du Nord, pour un photographe, c\'est un véritable festival. Des scènes de masse "si photogéniques qu\'elles en sont étouffantes", raconte Ed Jones. Ce photographe basé à Pékin s\'est rendu à Pyongyang avec deux autres journalistes de l\'AFP, fin juillet, pour assister aux festivités du 60ème anniversaire de la fin de la guerre de Corée. </br></br>  Comment ne pas se laisser dépasser par les flots d\'images qui vous assaillent? Capturer non seulement l\'ampleur du défilé mais aussi les visages marquants dans la troupe ou dans la foule? Et surtout, comment un reporter étroitement surveillé par ses guides officiels peut-il réussir à voir un peu de ce qui se cache derrière l\'impeccable façade qui lui est présentée?',
	},
	{
		media: 'assets/actusAFP/photo4.png',
		title: 'Shopping à pyongyang',
		text: 'Filmer étals et clients dans un magasin est banal, voire ennuyeux, dans une majorité de pays. Mais en Corée du Nord, cela relève presque de l\'exploit. Diane Desobeau, journaliste reporter d\'images à l\'AFPTV basée à Hong Kong, raconte comment une équipe de reporters de l\'AFP présente à Pyongyang fin juillet pour les célébrations du 60ème anniversaire de la fin de la guerre de Corée a pu effectuer une visite à l\'improviste dans un supermarché de la capitale du pays le plus fermé du monde. Dans ce grand magasin où s\'approvisionne la classe moyenne, on est loin de la Corée du Nord pauvre, celle qui a faim et qui manque d\'électricité. Pour autant, les journalistes étrangers n\'y sont pas les bienvenus...',
	},
	{
		media: 'assets/actusAFP/photo5.png',
		title: 'ouvrir un bureau à pyongyang',
		text: 'Qu’est-ce qu’une agence mondiale d\'information va faire dans l’un des pays les plus hermétiques au monde ? La réponse est dans la question. C’est justement parce que les images de Corée du Nord sont rarissimes, que l’information distillée y est entièrement et minutieusement contrôlée par le régime, qu’elles sont précieuses."',
	}
]


export default {
  splines,
	keyPoints,
	textsPanel,
	subtitles,
	voiceOver,
	chaptersTitle,
	conclusions,
	timelineIndicators,
	actus
}
