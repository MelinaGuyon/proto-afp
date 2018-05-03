import datas from '../../../datas/Experience1.js'

class BetweenChapters {
    constructor(options) {
      Storage.BetweenChaptersClass = this

      this.initFcTable()
    }

    initFcTable = () => {
      this.table = [
        [ this.launchVoiceOver(0), this.launchVoiceOver(1), this.launchText(0), this.launchText(1) ],

        [ this.launchVoiceOver(2), this.launchVoiceOver(3), this.launchConclusionOne, this.stopConclusion ],

        [ this.launchText(2) ],

        [ this.launchVoiceOver(4), this.launchVoiceOver(5), this.launchConclusionTwo, this.stopConclusion ],

        [],

        [ this.launchVoiceOver(6), this.launchVoiceOver(7), this.launchConclusionThree, this.stopConclusion ],

        [ this.launchVoiceOver(8) ],

        [ this.launchVoiceOver(9), this.launchVoiceOver(10), this.launchVoiceOver(11) ]
      ]
    }

    updateScene = (index, step) => {
      if (this.table[index][step]) this.table[index][step]()
    }

    launchText = (index) => () => {
      Storage.TextWriting.writeInfo({ text: datas.textsPanel[index] })
    }

    launchVoiceOver = (index) => () => {
      Storage.InterfaceClass.subtitles.writeSubtitles(datas.subtitles[index])
      Storage.SoundManagerClass.launchVoiceOver(datas.voiceOver[index])
    }

    launchConclusionOne = () => {
      console.log('je lance conclu chapitre 1')
      Storage.ChaptersConclusionClass.bindConclu()
    }

    launchConclusionTwo = () => {
      console.log('je lance conclu chapitre 2')
      Storage.ChaptersConclusionClass.bindConclu()
    }

    launchConclusionThree = () => {
      console.log('je lance conclu chapitre 3')
      Storage.SplineClass.updateStep(0.8)
      Storage.ChaptersConclusionClass.bindConclu()
    }

    stopConclusion = () => {
      console.log('je stop conclu')
      Storage.ChaptersConclusionClass.unbindConclu()
    }
}

export default BetweenChapters
