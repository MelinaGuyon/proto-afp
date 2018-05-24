import { throttle } from 'lodash'

import datas from '../../../datas/Experience1.js'

class BetweenChapters {
    constructor(options) {
      Storage.BetweenChaptersClass = this
      this.initFcTable()
    }

    initFcTable = () => {
      this.table = [
        [this.launchVoiceOver(1), this.launchText(0) ],

        [ this.launchText(1), this.launchVoiceOver(3), this.launchText(2), this.launchConclusion(1), this.stopConclusion ],

        [ this.launchVoiceOver(4), this.launchVoiceOver(5),  this.launchText(3), this.launchConclusion(2), this.stopConclusion ],

        [ this.launchVoiceOver(6), this.launchVoiceOver(7), this.launchConclusion(3), this.stopConclusion ],

        [ this.launchVoiceOver(9), this.launchVoiceOver(10), this.launchVoiceOver(11) ]
      ]
    }

    updateScene = (index, step) => {
      if (this.table[index][step]) this.table[index][step]()
    }

    launchText = (index) => () => {
      this.lauchTextDelayed(index)
    }

    // litle safety
    lauchTextDelayed = throttle((index) => {
      Storage.TextWriting.writeInfo({ text: datas.textsPanel[index] })
    }, 50, {leading: true, trailing: true})

    launchVoiceOver = (index) => () => {
      Storage.InterfaceClass.subtitles.writeSubtitles(datas.subtitles[index], index)
      Storage.SoundManagerClass.launchVoiceOver(datas.voiceOver[index])
    }

    launchMusic = (src) => () => {
      console.log('je lance music')
      Storage.SoundManagerClass.createNewAmbiance(src)
    }

    launchConclusion = (index) => () => {
      console.log('je lance conclu')
      Storage.SoundManagerClass.createNewAmbiance("assets/sound/son_conclusion.mp3")
      if (index == 3) Storage.SplineClass.updateStep(0.8)
      Storage.ChaptersConclusionClass.bindConclu()
    }

    stopConclusion = () => {
      console.log('je stop conclu')
      Storage.ChaptersConclusionClass.unbindConclu()
    }
}

export default BetweenChapters
