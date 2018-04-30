import anime from 'animejs'

import datas from '../../../datas/Experience1.js'

class SoundManager {
    constructor(options) {
			Storage.SoundManagerClass = this
			this.state = options

      this.voiceOver
    }

    launchVoiceOver = (track) => {
      if (this.voiceOver) this.voiceOver.pause()
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
}

export default SoundManager
