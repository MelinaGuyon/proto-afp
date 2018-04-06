class BetweenChapters {
    constructor(options) {
      Storage.BetweenChaptersClass = this

      this.initFcTable()
    }

    initFcTable = () => {
      this.table = [
        [ this.launchMap, this.launchFrontier ],
        [ this.launchConclusion ],
        [ this.launchSound ],
        []
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

    launchConclusion = () => {
      console.log('je lance conclu chapitre 1')
      Storage.Chapitre1Class.bindConclu()
    }

    launchSound = () => {
      console.log('je lance propagande sonore')
    }
}

export default BetweenChapters
