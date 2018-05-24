import anime from 'animejs'

import datas from '../../../datas/Experience1.js'

class SoundManager {
    constructor(options) {
			Storage.SoundManagerClass = this
			this.state = options

      this.voiceOver
      this.ambianceSound
      this.backgroundMusic
    }

    launchVoiceOver = (track) => {
      this.createNewVoiceOver(track)
    }

    createNewVoiceOver = (track) => {
      console.log('je lance voice over', track)
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

    launchAmbianceSound = (track) => {
      this.createNewAmbiance(track)
    }

    createNewAmbiance = (track) => {
      console.log('je lance new ambiance', track)
      this.ambianceSound = new Audio(track)
      this.ambianceSound.volume = 0
      this.ambianceSound.play()
      anime({
        targets: this.ambianceSound,
        volume: [0, .8],
        duration: 600,
        easing: 'linear'
      })
    }

    launchNoisySound = (track) => {
      this.createNoisySound(track)
    }

    createNoisySound = (track) => {
      console.log('je lance second ambiance', track)
      this.noisySound = new Audio(track)
      this.noisySound.volume = 0
      this.noisySound.play()
      anime({
        targets: this.noisySound,
        volume: [0, 0.7],
        duration: 600,
        easing: 'linear'
      })
    }

    launchBackgroundMusic = (track) => {
      this.createNewBackgroundMusic(track)
    }

    createNewBackgroundMusic = (track) => {
      this.backgroundMusic = new Audio(track)
      this.backgroundMusic.volume = 0
      this.backgroundMusic.play()
      anime({
        targets: this.backgroundMusic,
        volume: [0, 0.8],
        duration: 600,
        easing: 'linear'
      })
    }

}

export default SoundManager
