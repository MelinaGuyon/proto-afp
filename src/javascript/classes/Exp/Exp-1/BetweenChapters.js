import datas from '../../../datas/Experience1.js'

class BetweenChapters {
    constructor(options) {
      Storage.BetweenChaptersClass = this

      this.initFcTable()
    }

    initFcTable = () => {
      this.table = [
        [ this.launchText(0), this.launchText(1) ],

        [ this.launchConclusionOne, this.stopConclusion ],

        [ this.launchText(2) ],

        [ this.launchConclusionTwo, this.stopConclusion ]
      ]
    }

    updateScene = (index, step) => {
      this.table[index][step - 1]()
    }

    launchText = (index) => () => {
      Storage.TextWriting.writeInfo({ text: datas.textsPanel[index] })
    }

    launchConclusionOne = () => {
      console.log('je lance conclu chapitre 1')
      Storage.ChaptersConclusionClass.bindConclu()
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
