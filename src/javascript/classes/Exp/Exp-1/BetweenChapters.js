import TextWriting from '../Common/TextWriting.js'

class BetweenChapters {
    constructor(options) {
      Storage.BetweenChaptersClass = this

      this.initFcTable()
    }

    initFcTable = () => {
      this.table = [
        [ this.launchMap, this.launchFrontier ],
        [ this.launchConclusionOne, this.stopConclusion ],
        [ this.launchSound ],
        [ this.launchConclusionTwo, this.stopConclusion ]
      ]
    }

    updateScene = (index, step) => {
      this.table[index][step - 1]()
    }

    launchMap = () => {
      console.log('je lance la carte')
      new TextWriting({
        strings: ["La “Dure Marche” : 3 millions de personnes sont décédées à cause de la famine sous le règne de Kim Sung Il, une période surnommé la “Dure Marche”."],
        typeSpeed: 30,
        loopCount: 1,
        onComplete: function(self) { Storage.TextWriting.onComplete() }
      })
    }

    launchFrontier = () => {
      console.log('je lance la frontère colorée')
      new TextWriting({
        strings: ["Chaque Nord-Coréen recevait 5$ dollars par mois de la part du gouvernement. Un kilo de riz coûtant 3$, un habitant devait se contenter d’à peine deux kilo de riz pour survivre jusqu’à la fin du mois."],
        typeSpeed: 30,
        loopCount: 1,
        onComplete: function(self) { Storage.TextWriting.onComplete() }
      })
    }

    launchConclusionOne = () => {
      console.log('je lance conclu chapitre 1')
      Storage.ChaptersConclusionClass.bindConclu()
    }

    launchSound = () => {
      console.log('je lance propagande sonore')
      new TextWriting({
        strings: ["Avant 12 ans, il est interdit aux Nord-Coréens d’assister à une exécution publique; après 12 ans, cela devient obligatoire."],
        typeSpeed: 30,
        loopCount: 1,
        onComplete: function(self) { Storage.TextWriting.onComplete() }
      })
    }

    launchConclusionTwo = () => {
      console.log('je lance conclu chapitre 2')
      Storage.ChaptersConclusionClass.bindConclu()
    }

    stopConclusion = () => {
      console.log('je stop conclu')
      Storage.ChaptersConclusionClass.unbindConclu()
    }
}

export default BetweenChapters
