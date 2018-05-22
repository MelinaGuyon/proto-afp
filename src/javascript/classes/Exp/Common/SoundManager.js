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
      if (this.voiceOver) this.updateVoiceOverSrc(track)
      else this.createNewVoiceOver(track)
    }

    createNewVoiceOver = (track) => {
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

    updateVoiceOverSrc = (track) => {
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

    launchAmbianceSound = (track) => {
      if (this.ambianceSound) this.updateAmbianceSrc(track)
      else this.createNewAmbiance(track)
    }

    createNewAmbiance = (track) => {
      this.ambianceSound = new Audio(track)
      this.ambianceSound.volume = 0
      this.ambianceSound.play()
      anime({
        targets: this.ambianceSound,
        volume: [0, 1],
        duration: 600,
        easing: 'linear'
      })
    }

    updateAmbianceSrc = (track) => {
      anime({
        targets: this.ambianceSound,
        volume: [1, 0],
        duration: 600,
        easing: 'linear',
        complete: () => {
          this.ambianceSound.pause()
          this.ambianceSound.src = track
          this.ambianceSound.play()
          anime({
            targets: this.ambianceSound,
            volume: [0, 1],
            duration: 600,
            easing: 'linear'
          })
        }
      })
    }

    launchBackgroundMusic = (track) => {
      if (this.backgroundMusic) this.updateBackgroundMusicSrc(track)
      else this.createNewBackgroundMusic(track)
    }

    createNewBackgroundMusic = (track) => {
      this.backgroundMusic = new Audio(track)
      this.backgroundMusic.volume = 0
      this.backgroundMusic.play()
      anime({
        targets: this.backgroundMusic,
        volume: [0, 1],
        duration: 600,
        easing: 'linear'
      })
    }

    updateBackgroundMusicSrc = (track) => {
      anime({
        targets: this.backgroundMusic,
        volume: [1, 0],
        duration: 600,
        easing: 'linear',
        complete: () => {
          this.backgroundMusic.pause()
          this.backgroundMusic.src = track
          this.backgroundMusic.play()
          anime({
            targets: this.backgroundMusic,
            volume: [0, 1],
            duration: 600,
            easing: 'linear'
          })
        }
      })
    }
}

export default SoundManager
