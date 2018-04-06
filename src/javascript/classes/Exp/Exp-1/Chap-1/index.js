import ObjectsLoader from './ObjectsLoader'

class Chapitre1 {
    constructor(options) {
		Storage.Chapitre1Class = this
    this.state = options

    //this.modelsGroup
		this.videosGroupe
    this.clicked = false
      
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

		this.loadChapter()
    }

	loadChapter = () => {
    this.loader = new ObjectsLoader()
    this.loader.load().then((response) => {
      console.log("RESPONSE", response)
      this.videosGroupe = response
    })
	}

  init = () => {
    //this.displayChapterObjects()

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  displayVideo = () => {
    this.state.relatedCamera.add(this.videosGroupe)
    Storage.Exp1Chap1ObjLoader.video.play()
  }
  deleteVideo = () => {
    this.state.relatedCamera.remove(this.videosGroupe)
    Storage.Exp1Chap1ObjLoader.video.pause()
  }

  bindConclu = () => {
    document.addEventListener('mousedown', this.onMouseDown, false )
    document.addEventListener('mouseup', this.onMouseUp, false )
  }

  onMouseDown = () => {
    if ( this.clicked === false ) {
      this.displayVideo()
      this.clicked = true
    }
  }

  onMouseUp = () => {
    if ( this.clicked === true ) {
      this.deleteVideo()
      this.clicked = false
    }
  }
}

export default Chapitre1
