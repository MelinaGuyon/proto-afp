const splines = {
	betweenIntroductionChapterOne: [
		new THREE.Vector3(0, 600, -6500),
		new THREE.Vector3(0, 600, -9000),
		new THREE.Vector3(1000, 1200, -12000),
		new THREE.Vector3(-300, 400, -15000),
		new THREE.Vector3( 0, 600, -22000)
	],
	chapter1: [
		new THREE.Vector3(0, 150, -25000),
		new THREE.Vector3( 0, 150, -30000)
	],
	chapter2: [
		new THREE.Vector3(0, 400, -32000),
		new THREE.Vector3(0, 250, -46000),
	],
	chapter3: [
		new THREE.Vector3(0, 600, -50000),
		new THREE.Vector3(0, 200, -58000),
		new THREE.Vector3( 0, 250, -60900),
		new THREE.Vector3( 5, 250, -60850)
	],
	conclusion: [
		new THREE.Vector3( 0, 250, -62500),
		new THREE.Vector3(0, 250, -68500),
		new THREE.Vector3(0, 280, -69500),
		new THREE.Vector3(650, 310, -70500),
		new THREE.Vector3( 0, 340, -71000),
		new THREE.Vector3( -650, 370, -70500),
		new THREE.Vector3( 0, 410, -69500),
		new THREE.Vector3( 0, 450, -72000)
	]
}

const animations = {
	enter: [
		[
			new THREE.Vector3(0, 600, -6400)
		],
		[
			new THREE.Vector3(0, 0, Math.PI/3*6)
		]
	],
	toChapterThree: [
		[
			new THREE.Vector3(600, 250, -46500),
			new THREE.Vector3(2000, 250, -47375),
			new THREE.Vector3(2000, 250, -48250),
			new THREE.Vector3(600, 250, -49125),
			new THREE.Vector3(0, 250, -50000),
		],
		[
			new THREE.Vector3(0, -Math.PI/2, -Math.PI/10),
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(0, Math.PI/4, Math.PI/10),
			new THREE.Vector3(0, Math.PI/2, 0),
			new THREE.Vector3(0, 0, 0),
		]
	]
}

const keyPointsOnSpline = {
	betweenIntroductionChapterOne: [.6, .9],
	chapter1: [.15, .33, .7, .85],
	chapter2: [.1, .6, .9],
	chapter3: [.3, .4, .7, .9],
	conclusion: [.001, .3, .75]
}

const textsPanel =  [
	'A la frontière entre les deux Corées apparaît un village où personne ne vit. Les bâtiments sont dépourvus de fenêtres et les lumières s’y activent à heure fixe. Il s’agit en réalité d’une “ville propagande”, visant à donner une bonne image des cités nord-coréenne auprès de la Corée du Sud. Cela cache les réelles conditions de vie du pays.',

	'Chaque matin, les habitants de Pyongyang sont réveillés à 6h par un chant patriotique lancinant.',

	'L’ONU estime à 41% le taux de la population nord-coréenne sous-alimentée. Le paysage provincial prend des airs d’apocalypse. Les usines ont été abandonnées, les routes demeurent désertées par les voitures.',

	'L’armée nord-coréenne est l’un des sujets phares de la propagande du gouvernement, qui la présente comme la plus puissante au monde. Elle compte en effet le plus grand pourcentage au monde de militaires actifs par rapport au nombre d’habitants (5% de la population).',

	'La société nord-coréenne est divisée en trois grandes classes sociales, dont l\'une comprend les individus loyaux, une autre les citoyens neutres ou suspects, et une dernière les ennemis de l’Etat. Cette classification se fait dès la naissance selon les antécédents familiaux de l’individu.',

	'Les Kwanlisos sont des camps de travail forcé construits par le gouvernement, qui lui permettent d’emprisonner et exterminer les “ennemis de l’Etat”. L’ONU estime que de 80 000 à 120 000 prisonniers y sont détenus actuellement. Les conditions de vie y sont sont déplorables : la torture est courante, les viols sont tolérés, les exécutions sont quotidiennes. Les détenus sont souvent incarcérés avec les membres de leur famille, les plaçant ainsi tous sous la menace du pouvoir. Ce système de « culpabilité par association » a pour but d\'étouffer toute contestation en contrôlant la population grâce à la peur.'
]

const chaptersTitle =  [
	'l\'envers du décor'
]

const conclusions =  [
	['assets/shaders/conclusion/conclusion1.mp4', 'video'],
	['assets/shaders/conclusion/conclusion2.mp4', 'video'],
	['assets/shaders/conclusion/conclusion3.mp4', 'video']
]

// number of spline, spline index begining
const timelineIndicators = [
	['CH 1  &nbsp/', 'L\'envers du décors', 2],
	['CH 2  &nbsp/', 'L\'armée protectrice', 1],
	['CH 3  &nbsp/', 'Les classes sociales', 1],
	['END  &nbsp&nbsp/', '', 1]
]

const subtitles = [
	[
		['Je m’appelle Min-Ho, je suis Nord-Coréen.', 0],
		['J’ai fui mon pays natal à 16 ans, et lui étais', 3000],
		['jusqu’alors toujours resté fidèle.', 5500],
		['Il était pour moi le meilleur pays au monde,', 7800],
		['car je ne connaissais rien d’autre.', 9500]
	],
	[
		['J’ai évolué jour après jour dans un monde artificiel,', 0],
		['dont les valeurs ne sont qu’une façade.', 3000]
	],
	[
		['C’est l’image d’un pays solide et fier qui est présentée,', 0],
		['pendant que nous mourons de faim derrière ses murs.', 2000]
	],
	[
		['J’ai vu une petite fille de deux ans affamée, succomber sous mes yeux.', 0],
		['Vous voyez, quand une personne meurt, les mouches sont les premières à le savoir.', 3000],
		['Même si elle respirait encore, elles se sont rassemblées', 7000],
		['autour de ses yeux et de sa bouche comme des folles…', 9000],
		['C’est à ce moment que j’ai décidé de fuir. ', 11000]
	],
	[
		['On glorifie notre puissante armée, grande défenseuse des peuples,', 0],
		['mais qui n’hésite pas à punir tout faux pas d’une froide exécution.', 3000]
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
		['Notre pays, prétendument uni autour des mêmes valeurs et objectifs,', 0],
		['est habité par une société divisée et méfiante.', 3500]
	],
	[
		['Toute parole doit être réfléchie, même entre amis,', 0],
		['ou elle provoquera la disparition de son initiateur, certainement dans l’un des Kwanlisos de l’Etat.', 4000],
		['Je n’ai appris ce qui se passe dans ces camps qu’après ma fuite du pays.', 8000],
		['Les prisonniers y sont mal nourris, à tel point que les enfants ne grandissent plus.', 12000],
		['Certains détenus sont torturés avec de longues aiguilles que les bourreaux insèrent sous leurs ongles,', 16000],
		['Des femmes sont violées puis forcées à avorter.', 20000]
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
	'assets/sound/Audio1.mp3',
	'assets/sound/Audio2.mp3',
	'assets/sound/Audio3.mp3',
	'assets/sound/Audio4.mp3',
	'assets/sound/Audio5.mp3',
	'assets/sound/Audio6.mp3',
	'assets/sound/Audio7.mp3',
	'assets/sound/Audio8.mp3',
	'assets/sound/Audio9.mp3',
	'assets/sound/Audio10.mp3',
	'assets/sound/Audio11.mp3',
	'assets/sound/Audio12.mp3',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav',
	'assets/sound/Audio2.wav'
]

const actus = [
	{
		media: 'assets/interface/actusAFP/photo.png',
		title: 'Couvrir le royaume de l\'absurde',
		text: 'Quel est le plus vraisemblable des articles parus dans la presse ces derniers jours à propos du jeune dirigeant nord-coréen Kim Jong-Un? Qu\'il a exécuté son oncle en le livrant nu à une meute de chiens affamés ? Ou qu\'il a fêté son anniversaire à Pyongyang avec une ancienne star du basket américain, réputée pour ses tatouages, ses piercings et son goût pour le déguisement et le catch ? <br></br> Démêler le vrai du faux à propos de la Corée du Nord est une tâche ardue: dans ce pays secret et isolé, dirigé d\'une main de fer depuis trois générations par les Kim, les rumeurs les plus surréalistes paraissent presque crédibles, explique Jung Ha-Won, journaliste au bureau de l\'AFP à Séoul.',
	},
	{
		media: 'assets/interface/actusAFP/photo2.png',
		title: 'visage de pyongyang',
		text: 'Depuis que l\'AFP a ouvert un bureau à Pyongyang en septembre, le photographe Ed Jones, basé à Séoul au sud, a réfléchi aux différentes façons de sortir des images stéréotypées de la Corée du Nord, que ce soit une parade militaire ou la photo volée de passants depuis un bus. </br></br> "L’idée d’une série de portraits semblait la bonne", écrit-il, "car elle impliquait les sujets eux-mêmes. Cette implication peut s’avérer problématique en Corée du nord, à cause de la méfiance innée envers les médias étrangers".',
	},
	{
		media: 'assets/interface/actusAFP/photo3.png',
		title: 'Photographe face au défilé de masse',
		text: 'Un défilé militaire en Corée du Nord, pour un photographe, c\'est un véritable festival. Des scènes de masse "si photogéniques qu\'elles en sont étouffantes", raconte Ed Jones. Ce photographe basé à Pékin s\'est rendu à Pyongyang avec deux autres journalistes de l\'AFP, fin juillet, pour assister aux festivités du 60ème anniversaire de la fin de la guerre de Corée. </br></br>  Comment ne pas se laisser dépasser par les flots d\'images qui vous assaillent? Capturer non seulement l\'ampleur du défilé mais aussi les visages marquants dans la troupe ou dans la foule? Et surtout, comment un reporter étroitement surveillé par ses guides officiels peut-il réussir à voir un peu de ce qui se cache derrière l\'impeccable façade qui lui est présentée?',
	},
	{
		media: 'assets/interface/actusAFP/photo4.png',
		title: 'Shopping à pyongyang',
		text: 'Filmer étals et clients dans un magasin est banal, voire ennuyeux, dans une majorité de pays. Mais en Corée du Nord, cela relève presque de l\'exploit. Diane Desobeau, journaliste reporter d\'images à l\'AFPTV basée à Hong Kong, raconte comment une équipe de reporters de l\'AFP présente à Pyongyang fin juillet pour les célébrations du 60ème anniversaire de la fin de la guerre de Corée a pu effectuer une visite à l\'improviste dans un supermarché de la capitale du pays le plus fermé du monde. <br></br> Dans ce grand magasin où s\'approvisionne la classe moyenne, on est loin de la Corée du Nord pauvre, celle qui a faim et qui manque d\'électricité. Pour autant, les journalistes étrangers n\'y sont pas les bienvenus...',
	},
	{
		media: 'assets/interface/actusAFP/photo5.png',
		title: 'ouvrir un bureau à pyongyang',
		text: 'Qu’est-ce qu’une agence mondiale d\'information va faire dans l’un des pays les plus hermétiques au monde ? La réponse est dans la question. C’est justement parce que les images de Corée du Nord sont rarissimes, que l’information distillée y est entièrement et minutieusement contrôlée par le régime, qu’elles sont précieuses."',
	}
]

const infosPeople = [
	{
		status: 'HOSTILE',
		info: 'Son grand père était partisan pour la Corée du Sud durant la guerre'
	},
	{
		status: 'HOSTILE',
		info: 'Sa mère a fui le pays avec son frère il y a 10 ans'
	},
	{
		status: 'HOSTILE',
		info: 'Son cousin est emprisonné dans le camps de travail de Yeko'
	},
	{
		status: 'HOSTILE',
		info: 'Sa famille n\'approuve pas l\'isolement politique du pays'
	},
	{
		status: 'HOSTILE',
		info: 'Sa mère a fui le pays avec son frère il y a 10 ans'
	},
	{
		status: 'HOSTILE',
		info: 'Son cousin est emprisonné dans le camps de travail de Yeko'
	},
	{
		status: 'HOSTILE',
		info: 'Sa mère a été executée pour avoir volé une propriété de l\'état'
	},
	{
		status: 'HOSTILE',
		info: 'Sa mère a été executée pour avoir volé une propriété de l\'état'
	},
	{
		status: 'HOSTILE',
		info: 'Sa mère a été executée pour avoir volé une propriété de l\'état'
	},
	{
		status: 'HOSTILE',
		info: 'Sa mère a été executée pour avoir volé une propriété de l\'état'
	},
	{
		status: 'HOSTILE',
		info: 'Sa mère a été executée pour avoir volé une propriété de l\'état'
	}
]


export default {
  splines,
	animations,
	keyPointsOnSpline,
	textsPanel,
	subtitles,
	voiceOver,
	infosPeople,
	chaptersTitle,
	conclusions,
	timelineIndicators,
	actus
}
