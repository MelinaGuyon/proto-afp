import ConclusionLoader from './ConclusionLoader'

class ChaptersConclusion {
    constructor(options) {
		Storage.ChaptersConclusionClass = this
    this.state = options

    console.log("OPTIONS CONCLU", this.state)

		this.conclusion
    this.clicked = false

		this.loadConclusion()
  }

	loadConclusion = () => {
    this.loader = new ConclusionLoader(this.state)
    this.loader.load().then((response) => {
      console.log("RESPONSE", response)
      this.conclusion = response
    })
	}

  init = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  displayConclusion = () => {
    this.state.relatedCamera.add(this.conclusion)
    this.state.media === "video" ? Storage.ConclusionLoader.video.play() : ''
  }
  deleteConclusion = () => {
    this.state.relatedCamera.remove(this.conclusion)
    this.state.media === "video" ? Storage.ConclusionLoader.video.pause() : ''
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
      this.displayConclusion()
      this.clicked = true
    }
  }

  onMouseUp = () => {
    if ( this.clicked === true ) {
      this.deleteConclusion()
      this.clicked = false
    }
  }
}

export default ChaptersConclusion
