class BetweenChapters {
    constructor(options) {
      Storage.BetweenChaptersClass = this

      this.initFcTable()
    }

    initFcTable = () => {
      this.table = [
        [ new Function('', 'return "je lance carte" '), new Function('', 'return "je lance frontiere" ') ],
        []
      ]
    }

    updateScene = (index, step) => {
      console.log(this.table[index][step - 1]())
    }
}

export default BetweenChapters
