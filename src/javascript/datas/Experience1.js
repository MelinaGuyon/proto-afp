const splines = {
	enter: [
	],
	betweenIntroductionChapterOne: [
		new THREE.Vector3(0, 600, -6500),
		new THREE.Vector3( 0, 600, -9000)
	],
	chapter1: [
		new THREE.Vector3(0, 150, -12000),
		new THREE.Vector3( 0, 150, -16000)
	],
	betweenChaptersOneTwo: [
		new THREE.Vector3(0, 400, -17000),
		new THREE.Vector3(0, 400, -19500),
	],
	chapter2: [
		new THREE.Vector3(0, 250, -21000),
	],
	betweenChaptersTwoThree: [
		new THREE.Vector3(0, 600, -25000),
		new THREE.Vector3(0, 600, -28000),
	],
	chapter3: [
		new THREE.Vector3(0, 250, -29000),
		new THREE.Vector3( 0, 250, -31900),
		new THREE.Vector3( 5, 250, -31850)
	],
	betweenChaptersThreeConclusion: [
		new THREE.Vector3( 0, 250, -33500),
		new THREE.Vector3( 0, 250, -38000)
	],
	conclusion: [
		new THREE.Vector3(0, 250, -39500),
		new THREE.Vector3(0, 280, -40500),
		new THREE.Vector3(650, 310, -41500),
		new THREE.Vector3( 0, 340, -42000),
		new THREE.Vector3( -650, 370, -41500),
		new THREE.Vector3( 0, 410, -40500),
		new THREE.Vector3( 0, 450, -43000)
	]
}

const keyPoints = {
	enter: [],
	betweenIntroductionChapterOne: [.00001, .5, .6, .7],
	chapter1: [.1, .3, .5, .7],
	betweenChaptersOneTwo: [.4],
	chapter2: [.01, .1, .5, .7],
	betweenChaptersTwoThree: [],
	chapter3: [.05, .3, .45, .7],
	betweenChaptersThreeConclusion: [.5],
	conclusion: [.001, .3, .75]
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
	['assets/conclusion/conclusion2.mp4', 'video'],
	['assets/conclusion/01.jpg', 'photo']
]

// number of spline, spline index begining
const timelineIndicators = [
	['CH 1  &nbsp/', 'L\'envers du décors', 3],
	['CH 2  &nbsp/', 'L\'armée protectrice', 2],
	['CH 3  &nbsp/', 'Les classes sociales', 2],
	['END  &nbsp&nbsp/', '', 2]
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
		['dont les valeurs ne sont qu’une façade.', 3500]
	],
	[
		['C’est l’image d’un pays solide et fier qui est présentée,', 0],
		['pendant que nous mourons de faim derrière ses murs.', 4000]
	],
	[
		['J’ai vu une petite fille de deux ans affamée, succomber sous mes yeux.', 0],
		['Vous voyez, quand une personne meurt, les mouches sont les premières à le savoir.', 4000],
		['Même si elle respirait encore, elles se sont rassemblées autour de ses yeux et de sa bouche comme des folles… ', 9000],
		['C’est à ce moment que j’ai décidé de fuir. ', 15000]
	],
	[
		['On glorifie notre puissante armée, grande défenseuse des peuples,', 0],
		['mais qui n’hésite pas à punir tout faux pas d’une froide exécution.', 4000]
	],
	[
		['J’avais 12 ans lorsque j’ai assisté à ma première exécution publique.', 0],
		['Le crime avait été de voler et vendre quelques mètres d’une corde épaisse appartenant à un site minier.', 4000],
		['Le coupable ne recevait aucune aide de l’état pour vivre', 8000],
		['et devait essayer de sauver sa famille de la faim. Mais il s’agissait d’une propriété du gouvernement…', 12000],
		['Tous les habitants du village sont sortis pour regarder l’exécution,', 16000],
		['même la famille du condamné.', 20000],
		['Les soldats se sont mis à tirer.', 24000],
		['Ils ont d’abord visé sa tête, puis son cou, sa poitrine, ses hanches, ses genoux et ses talons.', 28000],
		['Le corps se pliait sur lui-même au fil des tirs.', 32000],
		['La moitié de sa tête avait disparu, le sang jaillissait de sa poitrine.', 36000],
		['Et moi, cela me paraissait naturel, puisqu’il avait commis un crime...', 40000],
	],
	[
		['Notre pays, prétendument uni autour des mêmes valeurs et objectifs, est habité par une société divisée et méfiante.', 0],
		['Je faisais moi-même partie de la catégorie des individus dits “neutres” mais suspects, ayant un cousin en Corée du Sud.', 4000]
	],
	[
		['Toute parole doit être réfléchie, même entre amis,', 0],
		['ou elle provoquera la disparition de son initiateur, certainement dans l’un des Kwanlisos de l’Etat.', 4000],
		['Je n’ai appris ce qui se passe dans ces camps qu’après ma fuite du pays.', 8000],
		['Les prisonniers y sont mal nourris, à tel point que les enfants ne grandissent plus.', 12000],
		['Certains détenus sont torturés avec de longues aiguilles que les bourreaux insèrent sous leurs ongles,', 16000],
		['d’autres se font plonger la tête dans l’eau jusqu’à la limite de la noyade.', 20000],
		['Des femmes sont violées puis forcées à avorter.', 24000]
	],
	[
		['J’ai grandi dans une société où l’on m’a appris qui je devais être, qui servir, et contre qui me battre.', 0]
	],
	[
		['Notre chef nous ment.', 0],
		['Notre chef nous menace.', 1500],
		['C’est grâce à ces mirages qu’il détient les pleins pouvoirs sur le destin de notre nation.', 3000]
	],
	[
		['Et cela pourrait largement dépasser nos frontières…', 0]
	],
	[
		['Ce pays que j’ai aimé m’a traité en criminel, je l’ai fui pour survivre.', 0]
	]
]

const voiceOver = [
	'assets/sound/Audio1.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
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
		title: 'Photographe face au défilé de masse',
		text: 'Un défilé militaire en Corée du Nord, pour un photographe, c\'est un véritable festival. Des scènes de masse "si photogéniques qu\'elles en sont étouffantes", raconte Ed Jones. Ce photographe basé à Pékin s\'est rendu à Pyongyang avec deux autres journalistes de l\'AFP, fin juillet, pour assister aux festivités du 60ème anniversaire de la fin de la guerre de Corée. </br></br>  Comment ne pas se laisser dépasser par les flots d\'images qui vous assaillent? Capturer non seulement l\'ampleur du défilé mais aussi les visages marquants dans la troupe ou dans la foule? Et surtout, comment un reporter étroitement surveillé par ses guides officiels peut-il réussir à voir un peu de ce qui se cache derrière l\'impeccable façade qui lui est présentée?',
	},
	{
		media: 'assets/actusAFP/photo4.png',
		title: 'Shopping à pyongyang',
		text: 'Filmer étals et clients dans un magasin est banal, voire ennuyeux, dans une majorité de pays. Mais en Corée du Nord, cela relève presque de l\'exploit. Diane Desobeau, journaliste reporter d\'images à l\'AFPTV basée à Hong Kong, raconte comment une équipe de reporters de l\'AFP présente à Pyongyang fin juillet pour les célébrations du 60ème anniversaire de la fin de la guerre de Corée a pu effectuer une visite à l\'improviste dans un supermarché de la capitale du pays le plus fermé du monde. <br></br> Dans ce grand magasin où s\'approvisionne la classe moyenne, on est loin de la Corée du Nord pauvre, celle qui a faim et qui manque d\'électricité. Pour autant, les journalistes étrangers n\'y sont pas les bienvenus...',
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
