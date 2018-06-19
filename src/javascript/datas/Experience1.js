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
		new THREE.Vector3(0, 250, -50000),
		new THREE.Vector3(0, 200, -54000),
		new THREE.Vector3( 0, 250, -56900),
		new THREE.Vector3( 5, 250, -56850)
	],
	// conclusion: [
	// 	new THREE.Vector3( 0, 250, -58500),
	// 	new THREE.Vector3( 0, 250, -64500),
	// ]
	conclusion: [
		new THREE.Vector3( 0, 250, -58500),
		new THREE.Vector3( 0, 900, -62500),
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
	]
}

const keyPointsOnSpline = {
	betweenIntroductionChapterOne: [.6, .9],
	chapter1: [.15, .33, .7, .85, .9],
	chapter2: [.1, .45, .7],
	chapter3: [.2, .35, .55, .7],
	conclusion: [/*.9,*/ /*.65, .85*/]
}

const textsPanel =  [
	'A la frontière entre les deux Corées apparaît un village où personne ne vit. Les bâtiments sont dépourvus de fenêtres et les lumières s’y activent à heure fixe. Il s’agit en réalité d’une “ville propagande”, qui vise à donner une bonne image des cités nord-coréenne auprès de la Corée du Sud. Cela cache les réelles conditions de vie du pays.',

	'Chaque matin, les habitants de Pyongyang sont réveillés à 6h par un chant patriotique lancinant.',

	'L’ONU estime à 41% le taux de la population nord-coréenne sous-alimentée. Le paysage provincial prend des airs d’apocalypse. Les usines ont été abandonnées, les routes demeurent désertées par les voitures.',

	'L’armée nord-coréenne est l’un des sujets phares de la propagande du gouvernement, qui la présente comme la plus puissante au monde. Elle compte en effet le plus grand pourcentage au monde de militaires actifs par rapport au nombre d’habitants (5% de la population).',

	'La société nord-coréenne est divisée en trois grandes classes sociales : l\'une comprend les individus loyaux, une autre les citoyens neutres ou suspects, et une dernière les ennemis de l’Etat. Cette classification se fait dès la naissance selon les antécédents familiaux de l’individu.',

	'Les Kwanlisos sont des camps de travail forcé construits par le gouvernement, où sont emprisonnés et exterminés les ennemis de l’Etat. L’ONU estime que de 80 000 à 120 000 prisonniers y sont détenus actuellement.'
]

const chaptersTitle =  [
	'L\'envers du décor',
	'Sombre protection',
	'Divisés'
]

const chaptersTitleSrc =  [
	'assets/interface/chapters/title_chapter1.svg',
	'assets/interface/chapters/title_chapter2.svg',
	'assets/interface/chapters/title_chapter3.svg',
]

const conclusions =  [
	['assets/shaders/conclusion/conclusion1.mp4', 'video'],
	['assets/shaders/conclusion/conclusion2.mp4', 'video'],
	['assets/shaders/conclusion/conclusion3.mp4', 'video']
]

// number of spline, spline index begining
const timelineIndicators = [
	['CH 1  &nbsp/', 'L\'envers du décors', 2],
	['CH 2  &nbsp/', 'Sombre protection', 1],
	['CH 3  &nbsp/', 'Divisés', 1],
	['END  &nbsp&nbsp/', '', 1]
]

const subtitles = [
	[
		['Je m’appelle Min-Ho, je suis Nord-Coréen.', 0],
		['J’ai fui mon pays natal à 16 ans, et lui étais', 3000],
		['jusqu’alors toujours resté fidèle.', 6000],
		['Il était pour moi le meilleur pays au monde,', 8000],
		['car je ne connaissais rien d’autre.', 11000]
	],
	[
		['J’ai évolué jour après jour dans un monde artificiel,', 0],
		['dont les valeurs ne sont qu’une façade.', 3000]
	],
	[
		['C’est l’image d’un pays solide et fier qui est présentée,', 0],
		['pendant que nous mourons de faim derrière ses murs.', 2500]
	],
	[
		['J’ai vu une petite fille de deux ans affamée, succomber sous mes yeux.', 0],
		['Vous voyez, quand une personne meurt, les mouches sont les premières à le savoir.', 3000],
		['Même si elle respirait encore, elles se sont rassemblées', 7000],
		['autour de ses yeux et de sa bouche comme des folles…', 10000],
		['C’est à ce moment que j’ai décidé de fuir. ', 12000]
	],
	[
		['On glorifie notre puissante armée, grande défenseuse des peuples,', 0],
		['mais qui n’hésite pas à punir tout faux pas ', 3000],
		['d’une froide exécution.', 5300]
	],
	[
		['J’avais 12 ans lorsque j’ai assisté à ma première exécution publique.', 0],
		['Le crime avait été de voler et vendre quelques mètres d’une corde épaisse', 3500],
		['appartenant à un site minier.', 7000],
		['Le coupable ne recevait aucune aide de l’état pour vivre', 8500],
		['et devait essayer de sauver sa famille de la faim.', 11000],
		['Tous les habitants du village sont sortis pour regarder l’exécution.', 13600],
		['Les soldats se sont mis à tirer.', 16600],
		['Ils ont d’abord visé sa tête, puis son cou, sa poitrine, ses hanches, ses genoux et ses talons.', 18200],
		['Le corps se pliait sur lui-même au fil des tirs.', 22500],
		['Et moi, cela me paraissait naturel,', 25000],
		['puisqu’il avait commis un crime...', 28400],
	],
	[
		['Notre pays,', 0],
		['prétendument uni autour des mêmes valeurs et objectifs,', 1000],
		['est habité par une société divisée et méfiante.', 3700]
	],
	[
		['Toute parole doit être réfléchie, même entre amis,', 0],
		['ou elle provoquera la disparition de son initiateur', 2800],
		['certainement dans l’un des Kwanlisos de l’Etat.', 5200],
		['Je n’ai appris ce qui se passe dans ces camps qu’après ma fuite du pays.', 7700],
		['Les prisonniers y sont mal nourris', 10800],
		['à tel point que les enfants ne grandissent plus.', 12300],
		['Certains détenus sont torturés', 14500],
		['avec de longues aiguilles que les bourreaux insèrent sous leurs ongles.', 16000],
		['Des femmes sont violées puis forcées à avorter.', 19000]
	],
	[
		['J’ai grandi dans une société où l’on m’a appris qui je devais être,', 0],
		['qui servir,', 3000],
		['et contre qui me battre.', 4500]
	],
	[
		['Notre chef nous ment.', 0],
		['Notre chef nous menace.', 1500],
		['C’est grâce à ces mirages', 3500],
		['qu’il détient les pleins pouvoirs sur le destin de notre nation.', 4800],
		['Et cela pourrait largement dépasser nos frontières…', 9000],
		['Ce pays que j’ai aimé m’a traité en criminel', 12500],
		['je l’ai fui pour survivre.', 15000],
		['', 17500]
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
		info: 'Son grand père était un partisan de la Corée du Sud durant la guerre'
	},
	{
		status: 'HOSTILE',
		info: 'Sa mère a fui le pays il y a dix ans'
	},
	{
		status: 'HOSTILE',
		info: 'Il lui est interdit de fréquenter de bonnes écoles'
	},
	{
		status: 'HOSTILE',
		info: 'Son cousin est emprisonné dans le camps de travail de Yeko'
	},
	{
		status: 'HOSTILE',
		info: 'Il ne pourra jamais vivre à Pyongyang'
	},
	{
		status: 'HOSTILE',
		info: 'Son père a été executé pour avoir volé une propriété de l\'état'
	},
	{
		status: 'HOSTILE',
		info: 'Son grand père était un partisan de la Corée du Sud durant la guerre'
	},
	{
		status: 'HOSTILE',
		info: 'Sa mère a fui le pays il y a dix ans'
	},
	{
		status: 'HOSTILE',
		info: 'Il lui est interdit de fréquenter de bonnes écoles'
	},
	{
		status: 'HOSTILE',
		info: 'Sa famille n\'approuve pas l\'isolement politique du pays'
	},
	{
		status: 'HOSTILE',
		info: 'Il ne pourra jamais vivre à Pyongyang'
	}
]

const instructions = [
	'assets/interface/instructions/scroll.svg',
	'assets/interface/instructions/chapter1.svg',
	'assets/interface/instructions/chapter2.svg',
	'assets/interface/instructions/chapter3.svg',
	'assets/interface/instructions/conclusion.svg'
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
	chaptersTitleSrc,
	conclusions,
	timelineIndicators,
	actus,
	instructions
}
