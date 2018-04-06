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
    }

    launchFrontier = () => {
      console.log('je lance la frontère colorée')
    }

    launchConclusionOne = () => {
      console.log('je lance conclu chapitre 1')
      Storage.ChaptersConclusionClass.bindConclu()
    }

    launchSound = () => {
      console.log('je lance propagande sonore')
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
