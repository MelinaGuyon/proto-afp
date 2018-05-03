import anime from 'animejs'

import datas from '../../../datas/Experience1.js'

class SoundManager {
    constructor(options) {
			Storage.SoundManagerClass = this
			this.state = options

      this.voiceOver
    }

    launchVoiceOver = (track) => {
      if (this.voiceOver) this.updateSrc(track)
      else this.creatNew(track)
    }

    creatNew = (track) => {
      console.log(track)
      this.voiceOver = new Audio(track)
      this.voiceOver.volume = 0
      this.voiceOver.play()
      anime({
        targets: this.voiceOver,
        volume: [0, 1],
        duration: 600,
        easing: 'linear'
      })
    }

    updateSrc = (track) => {
      console.log(track)
      this.voiceOver.pause()
      this.voiceOver.src = track
      this.voiceOver.volume = 0
      this.voiceOver.play()
      anime({
        targets: this.voiceOver,
        volume: [0, 1],
        duration: 600,
        easing: 'linear'
      })
    }
}

export default SoundManager
