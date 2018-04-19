import ConclusionLoader from './ConclusionLoader'
import anime from 'animejs'

class ChaptersConclusion {
    constructor(options) {
		Storage.ChaptersConclusionClass = this
    this.state = options

		this.conclusion
    this.clicked = false

    this.loadConclusion()
  }

	loadConclusion = () => {
    this.loader = new ConclusionLoader(this.state)
    this.loader.load().then((response) => {
      this.conclusion = response
      this.init()
    })
  }

  init = () => {
    this.state.relatedCamera.add(this.conclusion)
  }
  
  updateVideo = () => {
    // change video src
  }

  playConclusion = () => {
    anime.remove(this.conclusion.children[0].material)
    anime({
      targets: this.conclusion.children[0].material,
      opacity: 1,
      duration: 300,
      delay: 300,
      easing: 'easeOutQuad'
    })
    this.state.media === "video" ? Storage.ConclusionLoader.video.play() : ''
    Storage.ComposerClass.activate()
  }


  stopConclusion = () => {
    anime.remove(this.conclusion.children[0].material)
    anime({
      targets: this.conclusion.children[0].material,
      opacity: 0,
      duration: 300,
      delay: 300,
      easing: 'easeOutQuad'
    })
    this.state.media === "video" ? Storage.ConclusionLoader.video.pause() : ''
    Storage.ComposerClass.unactivate()
  }

  bindConclu = () => {
    document.addEventListener('mousedown', this.onMouseDown, false )
    document.addEventListener('mouseup', this.onMouseUp, false )
  }

  unbindConclu = () => {
    document.removeEventListener('mousedown', this.onMouseDown, false )
    document.removeEventListener('mouseup', this.onMouseUp, false )
  }

  onMouseDown = () => {
    if ( this.clicked === false ) {
      this.playConclusion()
      this.clicked = true
    }
  }

  onMouseUp = () => {
    if ( this.clicked === true ) {
      this.stopConclusion()
      this.clicked = false
    }
  }
}

export default ChaptersConclusion
