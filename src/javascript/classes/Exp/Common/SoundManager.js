import anime from 'animejs'

import datas from '../../../datas/Experience1.js'

class SoundManager {
    constructor(options) {
			Storage.SoundManagerClass = this
			this.state = options

      let listener = new THREE.AudioListener()
      Storage.CameraClasses[Storage.expName].camera.add( listener )

      this.voiceOver = new THREE.Audio( listener )
      this.ambianceSound = new THREE.Audio( listener )
      this.noisySound = new THREE.Audio( listener )
      this.backgroundMusic = new THREE.Audio( listener )
      this.audioLoader = new THREE.AudioLoader();
    }

    launchVoiceOver = (track) => {
      this.createNewVoiceOver(track)
    }

    createNewVoiceOver = (track) => {
      console.log('je lance voice over', track)
      this.audioLoader.load( track, (buffer) => {
      	this.voiceOver.setBuffer( buffer )
        this.voiceOver.play()
        anime({
          targets: this.voiceOver,
          volume: [0, 1],
          duration: 600,
          easing: 'linear'
        })
      })
    }

    launchAmbianceSound = (track) => {
      this.createNewAmbiance(track)
    }

    createNewAmbiance = (track) => {
      console.log('je lance new ambiance', track)
      this.audioLoader.load( track, (buffer) => {
      	this.ambianceSound.setBuffer( buffer )
        this.ambianceSound.play()
        anime({
          targets: this.ambianceSound,
          volume: [0, .7],
          duration: 2000,
          easing: 'linear'
        })
      })
    }

    launchNoisySound = (track) => {
      this.createNoisySound(track)
    }

    createNoisySound = (track) => {
      console.log('je lance second ambiance', track)
      this.audioLoader.load( track, (buffer) => {
      	this.noisySound.setBuffer( buffer )
        this.noisySound.play()
        anime({
          targets: this.noisySound,
          volume: [0, .7],
          duration: 600,
          easing: 'linear'
        })
      })
    }

    launchBackgroundMusic = (track) => {
      this.createNewBackgroundMusic(track)
    }

    createNewBackgroundMusic = (track) => {
      console.log('je lance BG music', track)
      this.audioLoader.load( track, (buffer) => {
      	this.backgroundMusic.setBuffer( buffer )
        this.backgroundMusic.play()
        anime({
          targets: this.backgroundMusic,
          volume: [0, .8],
          duration: 600,
          easing: 'linear'
        })
      })
    }

}

export default SoundManager
