import anime from 'animejs'

class ChaptersConclusion {
    constructor(options) {
		Storage.ChaptersConclusionClass = this
    this.mediaType = 'photo'

		this.conclusion
    this.clicked = false

    // to test
    // this.makePhotoTex('assets/01.jpg')
    // this.bindConclu()
  }

  makeVideoTex = (url) => {
    this.video = document.createElement( 'video' )
    this.video.autoplay = false
    this.video.loop = true
    this.video.src = url

    const texture = new THREE.VideoTexture(this.video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat

    Storage.ComposerClass.composer.passes[1].uniforms.videoTexture.value = texture
  }

  makePhotoTex = (url) => {
    const texture = new THREE.TextureLoader().load(url)
    Storage.ComposerClass.composer.passes[1].uniforms.videoTexture.value = texture
    this.video = null
  }

  updateMedia = (url, type) => {
    if (type !== this.mediaType) this.mediaType = type
    if (type === 'photo') this.makePhotoTex(url)
    else this.makeVideoTex(url)
  }

  playConclusion = () => {
    this.video && this.video.play()
    Storage.ComposerClass.activate()
  }

  stopConclusion = () => {
    this.video && this.video.pause()
    Storage.ComposerClass.unactivate()
  }

  bindConclu = () => {
    document.addEventListener('mousedown', this.onMouseDown, false )
    document.addEventListener('mouseup', this.onMouseUp, false )
    Storage.InterfaceClass.cursor.hold()
  }

  unbindConclu = () => {
    document.removeEventListener('mousedown', this.onMouseDown, false )
    document.removeEventListener('mouseup', this.onMouseUp, false )
    Storage.InterfaceClass.cursor.reset()
  }

  onMouseDown = () => {
    if ( this.clicked === false ) {
      Storage.InterfaceClass.cursor.animateHold(this.afterHoldAnime)
      this.clicked = true
    }
  }

  onMouseUp = () => {
    if ( this.clicked === true ) {
      Storage.InterfaceClass.cursor.animateUnhold(this.afterUnholdAnime)
      this.clicked = false
    }
  }

  afterHoldAnime = () => {
    if ( this.clicked === true ) {
      this.playConclusion()
      Storage.InterfaceClass.timelineExp.hideTimeline()
      Storage.InterfaceClass.textWriting.hidePanel()
      Storage.InterfaceClass.subtitles.hideSubtitles()
    }
  }

  afterUnholdAnime = () => {
    if ( this.clicked === false ) {
      this.stopConclusion()
      setTimeout(Storage.InterfaceClass.subtitles.showSubtitles, 800)
      setTimeout(Storage.InterfaceClass.timelineExp.showTimeline, 800)
      setTimeout(Storage.InterfaceClass.textWriting.showPanel, 800)
    }
  }
}

export default ChaptersConclusion
