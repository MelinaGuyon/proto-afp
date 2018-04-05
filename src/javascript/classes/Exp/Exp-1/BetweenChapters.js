class BetweenChapters {
    constructor(options) {
      Storage.BetweenChaptersClass = this

      this.initFcTable()
    }

    initFcTable = () => {
      this.table = [
        [ this.launchMap, this.launchFrontier ],
        [ this.launchSound ]
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

    launchSound = () => {
      console.log('je lance propagande sonore')
    }
}

export default BetweenChapters
